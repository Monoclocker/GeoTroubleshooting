using Backend.Application.DTO.User;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;

namespace Backend.Application.Interfaces
{
    public interface ITokenService
    {
        public string GenerateAccessToken(UserPublicDTO user, IList<string> userRoles, IConfiguration configuration);

        public string GenerateRefreshToken(string username, IConfiguration configuration);

        public ClaimsPrincipal? ValidateRefreshToken(string token, IConfiguration configuration);



    }
}
