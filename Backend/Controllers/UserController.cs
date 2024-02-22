using Backend.Data;
using Backend.Models;
using Backend.Models.DTO;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UserController : ControllerBase
    {
        readonly IConfiguration _configuration;
        readonly ITokenService _tokenService;
        readonly DatabaseContext _context;
        readonly UserManager<User> _userManager;

        public UserController(DatabaseContext context, UserManager<User> userManager,
            IConfiguration configuration, ITokenService tokenService)
        {
            _context = context;
            _userManager = userManager;
            _configuration = configuration;
            _tokenService = tokenService;
        }


        [HttpPost("register")]
        public async Task<IActionResult> RegisterNewUser(UserRegistrationDTO DTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            User newUser = new()
            {
                UserName = DTO.Username,
                Email = DTO.Email
            };

            IdentityResult registrationResult = await _userManager.CreateAsync(newUser, DTO.Password);

            if (!registrationResult.Succeeded) 
            {
                return new StatusCodeResult(StatusCodes.Status205ResetContent);
            }

            IdentityResult addToRoleResult = await _userManager.AddToRoleAsync(newUser, "user");

            if (!addToRoleResult.Succeeded)
            {
                return new StatusCodeResult(StatusCodes.Status205ResetContent);
            }

            string token = _tokenService.GenerateToken(newUser, await _userManager.GetRolesAsync(newUser), _configuration);
            
            return Ok(token);
        }

        [Authorize(Roles = "user")]
        [HttpPost("login")]
        public IActionResult Login()
        {
            return Ok();
        }

    }
}
