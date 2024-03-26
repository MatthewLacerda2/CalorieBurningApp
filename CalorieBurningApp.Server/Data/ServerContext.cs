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

        modelBuilder.Entity<User>(entity => { entity.ToTable("Users"); });
        modelBuilder.Entity<Streak>(entity => { entity.ToTable("Streaks"); });
        modelBuilder.Entity<ExerciseEntry>(entity => { entity.ToTable("ExerciseEntries"); });
    }
}