using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain
{
    public class Marker
    {
        public Guid Id { get; set; }
        public int PlaceId { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; } = default!;
        public List<string> Tags { get; set; } = default!;
        public DateTime TimeStamp { get; set; }
        public string? Description {  get; set; }
        public float[] Coordinates { get; set; } = default!;
        public List<Attachment> Attachments { get; set; } = default!;
    }
}
