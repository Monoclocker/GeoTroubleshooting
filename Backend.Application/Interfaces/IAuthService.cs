using Backend.Application.DTO.Auth;
using System.Security.Claims;

namespace Backend.Application.Interfaces
{
    public interface IAuthService
    {
        public Task<TokensDTO?> LoginAsync(UserLoginDTO dto);
        //public Task ConfirmEmailAsync(string email, string token);
        //public Task GenerateEmailConfirmation(UserPublicDTO dto);
        public Task<bool> RegisterUserAsync(UserRegistrationDTO dto);
        public Task<TokensDTO?> RefreshTokensAsync(string username);
    }
}
