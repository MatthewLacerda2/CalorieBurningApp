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

        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>()
            .HasKey(u => u.Id);

        modelBuilder.Entity<Streak>()
            .HasKey(s => s.UserId);

        modelBuilder.Entity<ExerciseEntry>()
            .HasKey(e => e.Id);

        modelBuilder.Entity<ExerciseEntry>()
            .HasOne<User>()
            .WithMany()
            .HasForeignKey(e => e.userId)
            .OnDelete(DeleteBehavior.Cascade); // Explicit cascade delete configuration

        modelBuilder.Entity<Streak>()
            .HasOne<User>()
            .WithOne()
            .HasForeignKey<Streak>(s => s.UserId)
            .OnDelete(DeleteBehavior.Cascade); // Explicit cascade delete configuration

        modelBuilder.Entity<User>()
            .Property(u => u.Id)
            .ValueGeneratedNever();
    }
}