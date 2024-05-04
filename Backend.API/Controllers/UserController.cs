using Backend.Application.DTO.User;
using Backend.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet("Info")]
        [ProducesResponseType(typeof(UserInfoDTO), 200)]
        public async Task<IActionResult> GetUserInfo()
        {

            string? username = User!.Claims!.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value;

            if (username == null)
            {
                return Unauthorized();
            }

            UserInfoDTO? info = await userService.GetUserInfoAsync(username);

            if (info == null)
            {
                return NotFound();
            }

            info.photo = "images/" + info.photo;

            return Ok(info);
            
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
