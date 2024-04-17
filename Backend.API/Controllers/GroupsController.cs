using Backend.Application.DTO.Group;
using Backend.Application.Exceptions;
using Backend.Application.Interfaces;
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
        readonly IGroupService groupService;
        readonly IConfiguration configuration;

        public GroupsController(IConfiguration _configuration, IGroupService _groupService)
        {
            configuration = _configuration;
            groupService = _groupService;
        }

        [Authorize]
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetAllGroups(int userId)
        {
            List<GroupPublicDTO> groups = await groupService.GetGroupsAsync(userId);

            return Ok(groups);
        }

        [HttpPost]
        public async Task<IActionResult> CreateGroup(GroupCreateDTO dto)
        {
            try
            {
                await groupService.CreateGroupAsync(dto);
            }
            catch (UnknownUserException userException)
            {
                return BadRequest(userException.Message);
            }

            return Ok();
        }
    }
}
