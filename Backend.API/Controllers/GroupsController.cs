using Backend.Application.DTO.Groups;
using Backend.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
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

        public GroupsController(IGroupService _groupService)
        {
            groupService = _groupService;
        }

        public record class Groups(int groupsCount, List<GroupInfoDTO> groups);

        [HttpGet]
        public async Task<IActionResult> GetGroups([FromQuery] int placeId, [FromQuery] int pageId)
        {

            string? username = User.Claims!.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value;

            if (username == null)
            {
                return NotFound();
            }

            var groups = await groupService.GetGroupsAsync(username, placeId, pageId);

            if (groups == null)
            {
                return NotFound();
            }

            Groups result = new Groups(groupsCount: groups.Value.Item1, groups: groups.Value.Item2);

            return Ok(result) ;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGroup(int id)
        {
            string? username = User.Claims!.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value;

            if (username == null)
            {
                return NotFound();
            }

            var group = await groupService.GetGroupAsync(username, id);

            if (group == null)
            {
                return NotFound();
            }

            return Ok(group);
        }


        [HttpPost]
        public async Task<IActionResult> CreateGroup(GroupCreateDTO dto)
        {
            bool result = await groupService.CreateGroupAsync(dto);

            if (!result)
            {
                return BadRequest();
            }

            return Ok();
        }

        public record class AddGroupDTO(string username, int groupId);

        [HttpPut]
        public async Task<IActionResult> AddToGroup(AddGroupDTO dto)
        {
            bool result = await groupService.AddToGroup(dto.username, dto.groupId);

            if (!result)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> RemoveFromGroup(AddGroupDTO dto)
        {
            bool result = await groupService.RemoveFromGroup(dto.username, dto.groupId);

            if (!result)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpDelete("{id}")]        
        public async Task<IActionResult> DeleteGroup(int id)
        {
            bool result = await groupService.DeleteGroupAsyncById(id);
            
            if (!result)
            {
                return BadRequest();
            }
            return Ok();

        }

    }
}
