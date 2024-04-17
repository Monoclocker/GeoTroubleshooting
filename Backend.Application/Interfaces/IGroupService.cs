using Backend.Application.DTO.Group;
using Backend.Application.DTO.Message;
using Backend.Application.DTO.User;

namespace Backend.Application.Interfaces
{
    public interface IGroupService
    {
        public Task<GroupPublicDTO> GetGroupAsync(int groupId);
        public Task<List<GroupPublicDTO>> GetGroupsAsync(int userId);
        public Task CreateGroupAsync(GroupCreateDTO dto);
        public Task UpdateGroupAsync(GroupPublicDTO dto);
        public Task DeleteGroupAsyncById(int id);
        public Task<List<MessageDTO>> GetGroupMessagesAsync(int groupId, int startIndex);
        public Task TrySendMessageAsync(int groupId, MessageCreateDTO dto);
        public Task RemoveMessageAsyncById(int messageId);
        public Task AddUserToGroup(UserPublicDTO user, int groupId);
        public Task RemoveUserFromGroup(UserPublicDTO user, int groupId);
    }
}
