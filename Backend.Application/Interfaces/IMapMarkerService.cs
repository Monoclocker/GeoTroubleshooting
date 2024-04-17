using Backend.Application.DTO.Marker;

namespace Backend.Application.Interfaces
{
    public interface IMapMarkerService
    {
        public Task<IEnumerable<MarkerDTO>> GetMarkersAsync();
        public Task AddMarkerAsync(MarkerDTO dto);
        public Task UpdateMarkerAsync(MarkerDTO dto);
        public Task RemoveMarkersAsync(MarkerDTO dto);
    }
}
