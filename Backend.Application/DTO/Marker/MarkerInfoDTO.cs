namespace Backend.Application.DTO.Marker
{
    public class MarkerInfoDTO : MarkerCreateDTO
    {
        public DateTime timestamp { get; set; }
        public string label { get; set; } = default!;
        public string id { get; set; } = default!;
    }
}
