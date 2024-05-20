using Backend.Application.DTO.Message;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Application.Interfaces
{
    public interface IMessageService
    {
        Task<MessageDTO?> CreateMessage(MessageDTO messageDTO);
        Task<MessageDTO[]> GetMessages(int groupId, int? count);
    }
}
