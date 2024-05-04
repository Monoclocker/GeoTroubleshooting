using Backend.Application.DTO.Auth;
using Backend.Application.Interfaces;
using Backend.Domain;
using Backend.External.Utils;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Backend.External.Services
{
    public class AuthService : IAuthService
    {

        IDatabase database;
        ITokenService tokenService;

        public AuthService(IDatabase database, ITokenService tokenService) 
        {
            this.database = database;
            this.tokenService = tokenService;
        }

        public async Task<TokensDTO?> LoginAsync(UserLoginDTO dto)
        {
            dto.password = Hasher.ComputeHash(dto.password);

            User? user = await database
                .Users
                .Include(x=>x.Role)
                .FirstOrDefaultAsync(x => x.Username == dto.username && x.Password == dto.password);

            if (user == null)
            {
                return null;
            }

            TokensDTO tokens = new TokensDTO()
            {
                accessToken = tokenService.GenerateToken(dto.username, user.Role.Name, 1),
                refreshToken = tokenService.GenerateToken(dto.username, user.Role.Name, 10),
            };

            return tokens;
        }

        public async Task<bool> RegisterUserAsync(UserRegistrationDTO dto)
        {
            dto.password = Hasher.ComputeHash(dto.password);

            User? user = await database
                .Users
                .FirstOrDefaultAsync(x => x.Username == dto.username || x.Email == dto.email);

            if (user != null)
            {
                return false;
            }

            user = new User()
            {
                Username = dto.username,
                Password = dto.password,
                Email = dto.email,
                FirstName = dto.firstName,
                LastName = dto.lastName,
                Birtdate = dto.birthdate,
                RoleId = dto.roleId
            };

            database.Users.Add(user);

            await database.SaveChangesAsync();

            return true;
        }

        public async Task<TokensDTO?> RefreshTokensAsync(string username)
        {
            User? user = await database
                .Users
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.Username == username);

            if (user == null)
            {
                return null;
            }

            TokensDTO tokens = new TokensDTO()
            {
                accessToken = tokenService.GenerateToken(username, user.Role.Name, 1),
                refreshToken = tokenService.GenerateToken(username, user.Role.Name, 10),
            };

            return tokens;
        }

    }
}
