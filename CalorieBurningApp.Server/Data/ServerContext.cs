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

    protected override void OnModelCreating(ModelBuilder modelBuilder) {

        // Configure primary keys
        modelBuilder.Entity<ExerciseEntry>()
            .HasKey(e => e.Id);

        modelBuilder.Entity<User>()
            .HasKey(u => u.Id);

        modelBuilder.Entity<Streak>()
            .HasKey(s => s.UserId); // Corrected the lambda parameter name

        // Define foreign key relationships using navigation properties
        modelBuilder.Entity<ExerciseEntry>()
            .HasOne(e => e.user)  // Assuming there's a navigation property named "User" in ExerciseEntry
            .WithMany()  // Assuming ExerciseEntry does not have a direct navigation property to Streak
            .HasForeignKey(e => e.userId); // Use the UserId property as the foreign key

        modelBuilder.Entity<Streak>()
            .HasOne(s => s.user) // Assuming there's a navigation property named "User" in Streak
            .WithMany()  // Assuming Streak does not have a direct navigation property to ExerciseEntry
            .HasForeignKey(s => s.UserId); // Use the UserId property as the foreign key
    }
}