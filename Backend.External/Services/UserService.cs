using Backend.Application.DTO.Token;
using Backend.Application.DTO.User;
using Backend.Application.Exceptions;
using Backend.Application.Interfaces;
using Backend.Domain;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using MimeKit;
using MongoDB.Driver;
using System.Security.Claims;

namespace Backend.External.Services
{
    public class UserService: IUserService
    {
        readonly UserManager<User> userManager;
        readonly SignInManager<User> signInManager;
        readonly ITokenService tokenService;
        readonly IConfiguration configuration;

        public UserService(
            SignInManager<User> _signInManager, 
            UserManager<User> _userManager, 
            ITokenService _tokenService,
            IConfiguration _configuration
        ) 
        {
            userManager = _userManager;
            signInManager = _signInManager;
            tokenService = _tokenService;
            configuration = _configuration;
        }

        public async Task<TokensDTO> TryLoginAsync(UserLoginDTO dto)
        {

            User? user = await userManager.FindByNameAsync(dto.Username);

            if (user == null)
            {
                throw new UnknownUserException();
            }

            SignInResult loginResult = await signInManager.CheckPasswordSignInAsync(user, dto.Password, false);

            if (!loginResult.Succeeded)
            {
                throw new BadPasswordException();
            }

            return new TokensDTO()
            {
                AccessToken = tokenService.GenerateAccessToken(
                        new UserPublicDTO {
                            UserName = user.UserName!,
                            Email = user.Email!
                        },
                        await userManager.GetRolesAsync(user!),
                        configuration
                    ),
                RefreshToken = tokenService.GenerateRefreshToken(
                        user.UserName!,
                        configuration
                    )
            };
        }

        public async Task GenerateEmailConfirmation(UserPublicDTO dto)
        {
            User? user = await userManager.FindByEmailAsync(dto.Email);

            if (user == null)
            {
                return;
            }

            string token = await userManager.GenerateEmailConfirmationTokenAsync(user);

            using MimeMessage emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress("GeoTroubleshootingSystem", configuration["smtpConfiguration:smtpLogin"]));
            emailMessage.To.Add(new MailboxAddress("", user.Email));
            emailMessage.Subject = "Подтверждение Email на платформе GeoTroubleshooting";
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = $"<a href=>{configuration["domain"]}/auth/emailconfirm/{token}" +
                $"Ссылка для подтверждения" +
                $"</a>  "
            };

            using (SmtpClient client = new SmtpClient())
            {
                await client.ConnectAsync("smtp.yandex.ru", 587, false);
                await client.AuthenticateAsync(configuration["smtpConfiguration:smtpLogin"], configuration["smtpConfiguration:smtpPassword"]);
                await client.SendAsync(emailMessage);

                await client.DisconnectAsync(true);
            }
        }

        public async Task TryConfirmEmailAsync(string email, string token)
        {
            User? user = await userManager.FindByEmailAsync(email);

            if (user == null)
            {
                throw new UnknownUserException();
            }

            IdentityResult confirmResult = await userManager.ConfirmEmailAsync(user, token);

            if (!confirmResult.Succeeded)
            {
                throw new EmailConfirmationException();
            }
        }

        public async Task<UserPublicDTO> GetUserInfoAsync(string username)
        {
            UserPublicDTO dto = new UserPublicDTO();

            User? user = await userManager.FindByNameAsync(username);

            if (user == null)
            {
                throw new UnknownUserException();
            }

            dto.FirstName = user.FirstName;
            dto.LastName = user.LastName;
            dto.MiddleName = user.MiddleName;
            dto.Birtdate = user.Birtdate;
            dto.UserName = username;
            dto.Email = user.Email!;
            dto.Id = user.Id;
            
            return dto;
        }

        public async Task RegisterUserAsync(UserRegistrationDTO dto)
        {
            User newUser = new User()
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                MiddleName = dto.MiddleName,
                Birtdate = dto.Birtdate.ToUniversalTime(),
                UserName = dto.Username,
                Email = dto.Email
            };

            IdentityResult registrationResult = await userManager.CreateAsync(newUser, dto.Password);

            if (!registrationResult.Succeeded)
            {
                throw new Exception("User creation error");
            }


        }

        public async Task UpdateUserAsync(UserPublicDTO dto)
        {
            User? user = await userManager.FindByIdAsync(dto.Id.ToString());

            if (user == null)
            {
                throw new UnknownUserException();
            }


            user.FirstName = dto.FirstName;
            user.LastName = dto.LastName;
            user.MiddleName = dto.MiddleName;
            user.Birtdate = dto.Birtdate;
            user.Email = dto.Email;


            IdentityResult updateResult = await userManager.UpdateAsync(user);

            if (!updateResult.Succeeded) 
            {
                throw new OperationException();
            }

        }

        public async Task DeleteUserByIdAsync(int id)
        {
            User? user = await userManager.FindByIdAsync(id.ToString());

            if (user == null)
            {
                throw new UnknownUserException();
            }

            IdentityResult deleteResult = await userManager.DeleteAsync(user);

            if (!deleteResult.Succeeded)
            {
                throw new OperationException();
            }

        }

        public async Task<TokensDTO> RefreshTokensAsync(ClaimsPrincipal? principal)
        {
            if (principal is null || !principal.HasClaim(x => x.Type == ClaimTypes.Name))
            {
                throw new BadClaimsException();
            }

            string? userName = principal.Claims.Where(x => x.Type == ClaimTypes.Name).First().Value;

            User? claimUser = await userManager.FindByNameAsync(userName); ;

            if (claimUser is null)
            {
                throw new UnknownUserException();
            }

            return new TokensDTO()
            {
                AccessToken = tokenService.GenerateAccessToken(new UserPublicDTO
                {
                    UserName = claimUser.UserName!,
                    Email = claimUser.Email!
                }, 
                await userManager.GetRolesAsync(claimUser), configuration),
                RefreshToken = tokenService.GenerateRefreshToken(userName, configuration)
            };
        }

    }
}
