
using Backend.Application.DTO;
using Backend.Application.DTO.User;
using Backend.Application.Interfaces;
using Backend.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UserController : ControllerBase
    {
        readonly IUserService userService;

        public UserController(IUserService _userService)
        {
            userService = _userService;
        }

        [Authorize]
        [HttpGet("Info")]
        [ProducesResponseType(typeof(UserPublicDTO), 200)]
        public async Task<IActionResult> GetUserInfo()
        {

            try
            {
                UserPublicDTO dto = await userService.GetUserInfoAsync(User.Claims.Where(x => x.Type == ClaimTypes.Name).First().Value);
                return Ok(dto);
            }
            catch
            {
                return BadRequest();
            }
        }

        //[HttpGet("Info/{id}")]
        //[ProducesResponseType(typeof(UserPublicDTO), 200)]
        //public async Task<IActionResult> GetUserInfoById(int id)
        //{
        //    User? user = await _userManager.FindByIdAsync(id.ToString());

        //    if (user is null)
        //    {
        //        return BadRequest();
        //    }

        //    return Ok(new UserInfoDTO()
        //    {
        //        UserName = user.UserName!,
        //        Email = user.Email!
        //    });
        //}

    }
}
