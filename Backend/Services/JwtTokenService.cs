using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend.Services
{
    public class JwtTokenService : ITokenService
    {
        public JwtTokenService() { }

        public string GenerateToken(User user, IList<string> userRoles, IConfiguration configuration)
        {
            List<Claim> userClaims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, user.UserName!),
                new Claim(ClaimTypes.Email, user.Email!)
            };

            foreach(string roleName in userRoles)
            {
                userClaims.Add(new Claim(ClaimTypes.Role, roleName));
            }


            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Issuer = configuration["jwt:Issuer"],
                Audience = configuration["jwt:Audience"],
                Expires = DateTime.UtcNow.AddMinutes(10),
                Claims = userClaims.ToDictionary(claim => claim.Type, claim => (object)claim.Value),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["jwt:Key"]!)), SecurityAlgorithms.HmacSha256)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
            

        }
    }
}
