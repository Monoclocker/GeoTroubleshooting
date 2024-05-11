using Backend.Application.DTO.Groups;
using Backend.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet]
        public async Task<IActionResult> GetGroups([FromQuery] string username, [FromQuery] int placeId, [FromQuery] int pageId)
        {
            var groups = await groupService.GetGroupsAsync(username, placeId, pageId);

            if (groups == null)
            {
                return NotFound();
            }

            return Ok(groups);
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
