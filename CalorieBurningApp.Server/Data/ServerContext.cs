using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using CalorieBurningApp.Server.Models;

namespace Server.Data;
public class ServerContext : DbContext {

    public DbSet<ExerciseEntry> ExerciseEntries { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<ConsecutiveDays> UserConsecutiveDays { get; set; }

    public ServerContext (DbContextOptions<ServerContext> options)
        : base(options) {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {

        // Configure primary keys
        modelBuilder.Entity<ExerciseEntry>()
            .HasKey(e => e.Id);

        modelBuilder.Entity<User>()
            .HasKey(u => u.Id);

        modelBuilder.Entity<ConsecutiveDays>()
            .HasKey(ucd => ucd.UserId);

        // Define foreign key relationships
        modelBuilder.Entity<ExerciseEntry>()
            .HasOne(e => e.userId)
            .WithMany()
            .HasForeignKey(e => e.userId);

        modelBuilder.Entity<ConsecutiveDays>()
            .HasOne(ucd => ucd.UserId)
            .WithMany()
            .HasForeignKey(ucd => ucd.UserId);
    }
}