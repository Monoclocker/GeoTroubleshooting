
using Backend.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Backend.External.Data
{
    public class DatabaseContext: IdentityDbContext<User, IdentityRole<int>, int>
    {

        public DbSet<Group> Groups { get; set; } = default!;

        public DatabaseContext(DbContextOptions<DatabaseContext> options): base(options) 
        { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Group>()
                    .HasMany(group => group.Users)
                    .WithMany(user => user.Groups)
                    .UsingEntity<GroupRole>(
                        entity => entity
                            .HasOne(field => field.User)
                            .WithMany(field => field.GroupRoles)
                            .HasForeignKey("GroupId"),
                        entity => entity
                            .HasOne(field => field.Group)
                            .WithMany(field => field.GroupRoles)
                            .HasForeignKey("UserId")
                            ); 
        }
    }
}
