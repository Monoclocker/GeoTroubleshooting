using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class DatabaseContext: IdentityDbContext<User, IdentityRole<int>, int>
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options): base(options) 
        { }
    }
}
