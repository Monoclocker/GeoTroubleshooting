using Backend.Application.Interfaces;
using Backend.Domain;
using Microsoft.EntityFrameworkCore;

namespace Backend.External.Data
{
    public class DatabaseContext: DbContext, IDatabase
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }

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



            //builder.Entity<Group>()
            //        .HasMany(group => group.Users)
            //        .WithMany(user => user.Groups)
            //        .UsingEntity<GroupRole>(
            //            entity => entity
            //                .HasOne(field => field.User)
            //                .WithMany(field => field.GroupRoles)
            //                .HasForeignKey("GroupId"),
            //            entity => entity
            //                .HasOne(field => field.Group)
            //                .WithMany(field => field.GroupRoles)
            //                .HasForeignKey("UserId")
            //                ); 
        }
    }
}
