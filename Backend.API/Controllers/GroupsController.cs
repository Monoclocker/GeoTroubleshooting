
using Backend.Domain;
using Backend.External.Data;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Backend.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    [Authorize]
    public class GroupsController : ControllerBase
    {
        //readonly DatabaseContext _context;
        //readonly UserManager<User> _userManager;

        //public GroupsController(DatabaseContext context, UserManager<User> userManager) 
        //{
        //    _context = context;
        //    _userManager = userManager;
        //}

        //[HttpGet]
        //public async Task<IActionResult> GetAllGroups()
        //{
        //    User? user = await _userManager.FindByNameAsync(User.Claims.Where(claim => claim.Type == ClaimTypes.Name).First().Value);

        //    List<Group> groups = user!.Groups.ToList();

        //    return Ok(groups);
        //}

        //[HttpPost]
        //public async Task<IActionResult> CreateGroup(string groupName)
        //{
        //    if (_context.Groups.Where(x=>x.name == groupName).Count() != 0)
        //    {
        //        return BadRequest();
        //    }

        //    Group group = new Group()
        //    {
        //        name = groupName,
        //        Users = new List<User>()
        //    };

        //    User? user = await _userManager.FindByNameAsync(User.Claims.Where(claim => claim.Type == ClaimTypes.Name).First().Value);

        //    group.Users.Add(user!);

        //    await _context.Groups.AddAsync(group);

        //    await _context.SaveChangesAsync();

        //    return Ok();
        //}
    }
}
