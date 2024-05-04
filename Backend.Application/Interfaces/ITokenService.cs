using System.Security.Claims;

namespace Backend.Application.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(string username, string rolename, int lifeDuration);
        ClaimsPrincipal? VerifyToken(string token);
    }
}
