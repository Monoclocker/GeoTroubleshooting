using Backend.Domain;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;

namespace Backend.External.Services
{
    public interface ITokenService
    {
        public string GenerateAccessToken(User user, IList<string> userRoles, IConfiguration configuration);

        public string GenerateRefreshToken(string username, IConfiguration configuration);

        public ClaimsPrincipal? ValidateRefreshToken(string token, IConfiguration configuration);



    }
}
