using Backend.Application.DTO.Places;
using Backend.Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.External.Services
{
    public class PlacesService: IPlacesService
    {
        IDatabase database;
        public PlacesService(IDatabase database)
        {
            this.database = database;
        }

        public async Task<List<PlaceTypeDTO>> GetPlaces()
        {
            var types = await database.Types.AsNoTracking().ToListAsync();

            var resultList = new List<PlaceTypeDTO>();

            var resultLazy = new Lazy<List<PlaceTypeDTO>>(resultList);

            foreach (var type in types)
            {
                PlaceTypeDTO dto = new PlaceTypeDTO() { id = type.Id, name = type.Name };

                var places = await database.Places
                    .AsNoTracking()
                    .Where(x=>x.TypeId == type.Id)
                    .ToListAsync();

                var placesList = new List<PlaceDTO>();

                foreach (var place in places)
                {
                    PlaceDTO placedto = new PlaceDTO() { id = place.Id, name = place.Name, coordinates = place.Coordinates };
                    placesList.Add(placedto);
                }

                dto.places = placesList.ToArray();

                resultList.Add(dto);
            }

            return resultLazy.Value;
        }
    }
}
