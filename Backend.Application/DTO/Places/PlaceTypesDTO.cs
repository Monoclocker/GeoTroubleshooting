

namespace Backend.Application.DTO.Places
{
    public class PlaceTypeDTO
    {
        public int id { get; set; }
        public string? name { get; set; }
        public PlaceDTO[]? places { get; set; }
    }
}
