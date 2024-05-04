using Backend.Domain;
using Microsoft.EntityFrameworkCore;

namespace Backend.Application.Interfaces
{
    public interface IDatabase
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }

        public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
