using Backend.Application.DTO.Groups;

namespace Backend.Application.Interfaces
{
    public interface IGroupService
    {
        //public Task<GroupInfoDTO> GetGroupAsync(int groupId);
        public Task<List<GroupInfoDTO>?> GetGroupsAsync(string username, int placeId, int pageId);
        public Task<bool> CreateGroupAsync(GroupCreateDTO dto);
        public Task<bool> AddToGroup(string username, int groupId);
        public Task<bool> RemoveFromGroup(string username, int groupId);
        public Task<bool> DeleteGroupAsyncById(int id);
    }
}
