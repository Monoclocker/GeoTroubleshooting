using Backend.Application.Interfaces;
using Backend.Domain;
using Microsoft.EntityFrameworkCore;

namespace Backend.External.Data
{
    public class DatabaseContext: DbContext, IDatabase
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Place> Places { get; set; }
        public DbSet<PlaceType> Types { get; set; }
        public DbSet<Group> Groups { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options): base(options) 
        { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
                .HasOne(u => u.Role)
                .WithMany(u => u.Users);

            builder.Entity<User>()
                .HasKey(u => u.Id);

            builder.Entity<User>()
                .HasAlternateKey(u => u.Username);

            builder.Entity<User>()
                .HasIndex(u => u.Email);

            builder.Entity<User>()
                .Property(u => u.IsEmailConfirmed)
                .HasDefaultValue(false);

            builder.Entity<User>()
                .Property(u => u.Photo)
                .HasDefaultValue("default.jpg");


            builder.Entity<Role>()
                .HasKey(r=>r.Id);

            builder.Entity<Place>()
                .HasKey(r => r.Id);

            builder.Entity<PlaceType>()
                .HasKey(r => r.Id);
            
            builder.Entity<Place>()
                .HasOne(x=>x.Type)
                .WithMany(x=>x.Places)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Group>()
                .HasKey(r => r.Id);

            builder.Entity<Group>()
                .HasMany(x => x.Users)
                .WithMany(x => x.Groups)
                .UsingEntity<GroupUsers>(
                    x =>
                    {
                        x.HasKey(r => new { r.UserId, r.GroupId });
                        x.HasOne(r => r.User).WithMany(r => r.GroupUsers);
                        x.HasOne(r => r.Group).WithMany(r => r.GroupUsers).OnDelete(DeleteBehavior.Cascade);
                    }
                );
        }
    }
}
