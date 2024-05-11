using Backend.Domain;

namespace Backend.Application.DTO.Marker
{
    public class MarkerCreateDTO
    {
        public string name { get; set; } = default!;
        public int placeId { get; set; }
        public string username { get; set; } = default!;
        public List<double> coordinates { get; set; } = default!;
        public List<Attachment> attachments { get; set; } = new List<Attachment>();
        //public string[] tags { get; set; } = default!;
        public string? description { get; set; }
    }
}
