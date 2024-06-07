using Backend.Application.DTO.Message;
using Backend.Application.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace Backend.Hubs
{
    public class ChatHub: Hub
    {
        IMessageService messageService;
        public ChatHub(IMessageService messageService) 
        {
            this.messageService = messageService;
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();

        }

        public async Task RegisterToChat(int groupId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupId.ToString());

            var messages = await messageService.GetMessages(groupId, 30);

            await Clients.Caller.SendAsync("SuccessRegistration", messages);
        }

        public async Task UnregisterFromChat(int groupId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupId.ToString());
        }

        public async Task CreateMessage(MessageDTO message)
        {
            var newMessage = await messageService.CreateMessage(message);

            await Clients.Group(message.groupId.ToString()!).SendAsync("NewMessage", newMessage);

        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            return base.OnDisconnectedAsync(exception);
        }

    }
}
