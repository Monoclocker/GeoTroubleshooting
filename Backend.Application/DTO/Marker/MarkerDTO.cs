using Backend.Domain;

namespace Backend.Application.DTO.Marker
{
    public class MarkerDTO
    {
        public string userName { get; set; } = default!;
        public string title { get; set; } = default!;
        public string? description { get; set; }
        public DateTime timestamp {  get; set; }
        public decimal[] coordinates { get; set; } = default!;
        public List<string> photos { get; set; } = new List<string>();
        public List<Tag> tags { get; set; } = new List<Tag>();
    }
}
