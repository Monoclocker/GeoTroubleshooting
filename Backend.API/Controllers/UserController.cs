
using Backend.Application.DTO;
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
        //readonly UserManager<User> _userManager;

        //public UserController(UserManager<User> userManager)
        //{
        //    _userManager = userManager;
        //}

        //[Authorize]
        //[HttpGet("Info")]
        //[ProducesResponseType(typeof(UserInfoDTO), 200)]
        //public async Task<IActionResult> GetUserInfo()
        //{
        //    User? user = await _userManager.FindByNameAsync(User.Claims.Where(x => x.Type == ClaimTypes.Name).First().Value);

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

        //[HttpGet("Info/{id}")]
        //[ProducesResponseType(typeof(UserInfoDTO), 200)]
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
