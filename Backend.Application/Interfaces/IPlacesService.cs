using Backend.Application.DTO.Places;

namespace Backend.Application.Interfaces
{
    public interface IPlacesService
    {
        public Task<List<PlaceTypeDTO>> GetPlaces();
        public Task<PlaceTypeDTO> AddType(PlaceTypeDTO dto);
        public Task<PlaceDTO> AddPlace(PlaceDTO dto, int typeId);
        public Task<bool> DeleteType(int id);
        public Task<bool> DeletePlace(int id);
    }
}
