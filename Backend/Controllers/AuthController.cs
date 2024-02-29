using Backend.Data;
using Backend.Models.DTO;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Amazon.Runtime.Internal;
using System.Text;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AuthController : ControllerBase
    {
        readonly IConfiguration _configuration;
        readonly ITokenService _tokenService;
        readonly UserManager<User> _userManager;

        public AuthController(UserManager<User> userManager,
            IConfiguration configuration, ITokenService tokenService)
        {
            _userManager = userManager;
            _configuration = configuration;
            _tokenService = tokenService;
        }

        [HttpPost("Registration")]
        public async Task<IActionResult> RegisterNewUser(UserRegistrationDTO DTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User newUser = new()
            {
                UserName = DTO.Username,
                Email = DTO.Email
            };

            IdentityResult registrationResult = await _userManager.CreateAsync(newUser, DTO.Password);

            if (!registrationResult.Succeeded)
            {
                return BadRequest(registrationResult.Errors);
            }

            await _userManager.AddToRoleAsync(newUser, "user");

            return Ok();
        }

        [HttpPost("Login")]
        public async Task<IActionResult> UserLogin(UserLoginDTO DTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User? signInUser = await _userManager.FindByNameAsync(DTO.Username);

            if (signInUser is null)
            {
                return BadRequest();
            }

            if (!await _userManager.CheckPasswordAsync(signInUser, DTO.Password))
            {
                return Unauthorized();
            }

            return Ok(new TokensDTO
            {
                AccessToken = _tokenService.GenerateAccessToken(signInUser, await _userManager.GetRolesAsync(signInUser), _configuration),
                RefreshToken = _tokenService.GenerateRefreshToken(signInUser.UserName!, _configuration)
            });
        }

        public record RefreshToken (string refreshToken);

        [HttpPost("Refresh")]
        public async Task<IActionResult> Refresh(RefreshToken DTO)
        {

            ClaimsPrincipal? principal = _tokenService.ValidateRefreshToken(DTO.refreshToken, _configuration);

            if (principal is null || !principal.HasClaim(x => x.Type == ClaimTypes.Name))
            {
                return BadRequest();
            }

            string? userName = principal.Claims.Where(x => x.Type == ClaimTypes.Name).First().Value;

            User? claimUser = await _userManager.FindByNameAsync(userName);;

            if (claimUser is null)
            {
                return BadRequest();
            }

            return Ok(new TokensDTO()
            {
                AccessToken = _tokenService.GenerateAccessToken(claimUser, await _userManager.GetRolesAsync(claimUser), _configuration),
                RefreshToken = _tokenService.GenerateRefreshToken(userName, _configuration)
            });
        }
    }
}
