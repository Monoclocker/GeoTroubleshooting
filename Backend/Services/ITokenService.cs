using Backend.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace Backend.Services
{
    public interface ITokenService
    {
        public string GenerateAccessToken(User user, IList<string> userRoles, IConfiguration configuration);

        public string GenerateRefreshToken(string username, IConfiguration configuration);

        public ClaimsPrincipal? ValidateRefreshToken(string token, IConfiguration configuration);



    }
}
