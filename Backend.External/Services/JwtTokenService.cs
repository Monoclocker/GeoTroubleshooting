using Backend.Domain;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend.External.Services
{
    public class JwtTokenService : ITokenService
    {
        public JwtTokenService() { }

        public string GenerateAccessToken(User user, IList<string> userRoles, IConfiguration configuration)
        {
            List<Claim> userClaims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, user.UserName!),
                new Claim(ClaimTypes.Email, user.Email!),
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

        public string GenerateRefreshToken(string username, IConfiguration configuration)
        {
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Issuer = configuration["jwt:Issuer"],
                Audience = configuration["jwt:Audience"],
                Expires = DateTime.UtcNow.AddDays(30),
                Claims = new List<Claim>()
                {
                    new Claim(ClaimTypes.Name, username)
                }.ToDictionary(x => x.Type, x => (object)x.Value),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["jwt:Key"]!)), SecurityAlgorithms.HmacSha256)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public ClaimsPrincipal? ValidateRefreshToken(string token, IConfiguration configuration) 
        {
            var tokenValidator = new JwtSecurityTokenHandler();

            var parameters = new TokenValidationParameters()
            {
                ClockSkew = TimeSpan.FromSeconds(0),
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = configuration["jwt:Issuer"],
                ValidAudience = configuration["jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["jwt:Key"]!))
            };

            SecurityToken verifiedToken;
            ClaimsPrincipal? principal = null;

            if (tokenValidator.CanReadToken(token))
            {
                try
                {
                    principal = tokenValidator.ValidateToken(token, parameters, out verifiedToken);

                }
                catch(Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }


            return principal;
        }

    }
}
