
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
    }
}
