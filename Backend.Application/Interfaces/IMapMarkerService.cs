using Backend.Application.DTO.Marker;

namespace Backend.Application.Interfaces
{
    public interface IMapMarkerService
    {
        public Task<List<MarkerInfoDTO>> GetMarkersAsync(MarkersGetDTO dto);
        public Task<MarkerInfoDTO> AddMarkerAsync(MarkerCreateDTO dto);
        public Task<bool> UpdateMarkerAsync(MarkerInfoDTO dto);
        public Task<bool> RemoveMarkersAsync(Guid id);
       
    }
}
