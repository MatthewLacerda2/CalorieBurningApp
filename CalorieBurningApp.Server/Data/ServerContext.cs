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

        modelBuilder.Entity<ExerciseEntry>()
            .HasKey(e => e.Id);

        modelBuilder.Entity<User>()
            .HasKey(u => u.Id);

        modelBuilder.Entity<Streak>()
            .HasKey(s => s.UserId);

        // Define foreign key relationships using navigation properties
        modelBuilder.Entity<ExerciseEntry>()
            .HasOne(e => e.user)
            .WithMany()  // Assuming ExerciseEntry does not have a direct navigation property to Streak
            .HasForeignKey(e => e.userId);

        modelBuilder.Entity<Streak>()
            .HasOne(s => s.user) // Assuming there's a navigation property named "User" in Streak
            .WithMany()  // Assuming Streak does not have a direct navigation property to ExerciseEntry
            .HasForeignKey(s => s.UserId);
    }
}