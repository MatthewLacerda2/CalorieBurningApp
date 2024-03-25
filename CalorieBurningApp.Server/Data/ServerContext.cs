using Microsoft.EntityFrameworkCore;
using CalorieBurningApp.Server.Models;

namespace Server.Data;
public class ServerContext : DbContext {

    public DbSet<ExerciseEntry> ExerciseEntries { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Streak> Streaks { get; set; }

    public ServerContext (DbContextOptions<ServerContext> options)
        : base(options) {

    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {

        base.OnConfiguring(optionsBuilder);

        optionsBuilder.UseMySql(
            "Server=localhost;Port=3306;Database=sqlcalories;User=lendacerda;Password=xpvista7810;",
            new MariaDbServerVersion(new Version(10, 5, 11)));
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder) {

        // Configure User entity
        modelBuilder.Entity<User>()
            .HasKey(u => u.Id);

        // Configure Streak entity
        modelBuilder.Entity<Streak>()
            .HasKey(s => s.UserId);

        // Configure ExerciseEntry entity
        modelBuilder.Entity<ExerciseEntry>()
            .HasKey(e => e.Id);

        // Define relationships
        modelBuilder.Entity<ExerciseEntry>()
            .HasOne<User>()
            .WithMany()
            .HasForeignKey(e => e.userId);

        modelBuilder.Entity<Streak>()
            .HasOne<User>()
            .WithOne()
            .HasForeignKey<Streak>(s => s.UserId);
    }
}