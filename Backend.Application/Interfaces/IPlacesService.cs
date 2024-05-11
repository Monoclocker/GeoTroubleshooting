using Backend.Application.DTO.Places;

namespace Backend.Application.Interfaces
{
    public interface IPlacesService
    {
        public Task<List<PlaceTypeDTO>> GetPlaces();
    }
}
