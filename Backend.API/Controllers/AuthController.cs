using Microsoft.AspNetCore.Mvc;
using Backend.Application.Interfaces;
using Backend.Application.DTO.Auth;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;


namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AuthController : ControllerBase
    {
        readonly IAuthService authService;

        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }

        [HttpPost("Registration")]
        public async Task<IActionResult> RegisterNewUser(UserRegistrationDTO DTO)
        {
            if (!ModelState.IsValid)
            {
                Console.WriteLine("f");
                return BadRequest(ModelState);
            }

            bool result = await authService.RegisterUserAsync(DTO);

            if (result)
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpPost("Login")]
        public async Task<IActionResult> UserLogin(UserLoginDTO DTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            TokensDTO? tokens = await authService.LoginAsync(DTO);

            if (tokens == null)
            {
                return BadRequest();
            }

            return Ok(tokens);

        }

        [Authorize]
        [HttpPost("Refresh")]
        public async Task<IActionResult> Refresh()
        {

            string? username = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value;

            if (username == null)
            {
                return Unauthorized();
            }

            TokensDTO? tokens = await authService.RefreshTokensAsync(username);

            if(tokens == null)
            {
                return Forbid();
            }

            return Ok(tokens);

        }
    }
}
