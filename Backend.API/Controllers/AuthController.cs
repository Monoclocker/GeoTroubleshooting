using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Backend.Application.Interfaces;
using Backend.Application.DTO.User;
using Backend.Application.DTO.Token;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AuthController : ControllerBase
    {
        readonly IConfiguration configuration;
        readonly IUserService userService;
        readonly ITokenService tokenService;

        public AuthController(IConfiguration _configuration, IUserService _userService, ITokenService _tokenService)
        {
            configuration = _configuration;
            userService = _userService;
            tokenService = _tokenService;
        }

        [HttpPost("Registration")]
        public async Task<IActionResult> RegisterNewUser(UserRegistrationDTO DTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await userService.RegisterUserAsync(DTO);
            }
            catch
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPost("Login")]
        public async Task<IActionResult> UserLogin(UserLoginDTO DTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                TokensDTO tokens = await userService.TryLoginAsync(DTO);
                return Ok(tokens);
            }
            catch
            {
                return Unauthorized();
            }
        }

        public record RefreshToken(string refreshToken);

        [HttpPost("Refresh")]
        public async Task<IActionResult> Refresh(RefreshToken dto)
        {
            ClaimsPrincipal? principal = tokenService.ValidateRefreshToken(dto.refreshToken, configuration);

            try
            {
                TokensDTO tokens = await userService.RefreshTokensAsync(principal);
                return Ok(tokens);
            }
            catch
            {
                return BadRequest();
            }

        }
    }
}
