using Backend.Models;
using Microsoft.AspNetCore.Identity;

namespace Backend.Services
{
    public interface ITokenService
    {
        public string GenerateToken(User user, IList<string> userRoles, IConfiguration configuration);
    }
}
