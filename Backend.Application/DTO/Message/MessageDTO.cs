using Backend.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Application.DTO.Message
{
    public class MessageDTO
    {
        public string? id { get; set; }
        public int? placeId {  get; set; }
        public int? groupId { get; set; }
        public string message { get; set; } = default!;
        public string username { get; set; } = default!;
        public DateTime? timestamp { get; set; }
        public List<Attachment>? attachments { get; set; } = new List<Attachment>();
    }
}
