using Backend.Application.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend.External.Services
{
    public class TokenService : ITokenService
    {

        readonly IConfiguration configuration;

        public TokenService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public string GenerateToken(string username, string roleName, int lifeDurationMinutes)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim(type: ClaimsIdentity.DefaultNameClaimType, username),
                new Claim(type: ClaimTypes.Role, roleName.ToString())
            };

            //Console.WriteLine(configuration["jwt:Issuer"]);

            //JwtSecurityToken jwt = new(
            //    issuer: configuration["jwt:Issuer"],
            //    expires: DateTime.Now.AddMinutes(lifeDurationMinutes),
            //    claims: claims,
            //    signingCredentials: new SigningCredentials(
            //        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["jwt:Key"]!)), SecurityAlgorithms.HmacSha256)
            //);

            //return new JwtSecurityTokenHandler().WriteToken(jwt);

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor()
            {
                Issuer = configuration["jwt:Issuer"],
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(lifeDurationMinutes),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["jwt:Key"]!)), SecurityAlgorithms.HmacSha256)
            };

            SecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public ClaimsPrincipal? VerifyToken(string token)
        {
            Console.WriteLine(token);

            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();

            TokenValidationParameters validationParameters = new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = configuration["jwt:Issuer"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["jwt:Key"]!))
            };

            SecurityToken verifiedToken;

            if (handler.CanReadToken(token))
            {
                try
                {
                    ClaimsPrincipal claims = handler.ValidateToken(token, validationParameters, out verifiedToken);
                    return claims;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                    return null;
                }
            }
            return null;
        }
    }
}
