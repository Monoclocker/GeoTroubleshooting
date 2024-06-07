using Backend.Application.DTO.Places;
using Backend.Application.Interfaces;
using Backend.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace Backend.External.Services
{
    public class PlacesService : IPlacesService
    {
        IDatabase database;
        IMongoDatabase mongo;
        IConfiguration configuration;
        public PlacesService(IDatabase database, IMongoDatabase mongoDatabase, IConfiguration configuration)
        {
            this.database = database;
            this.mongo = mongoDatabase;
            this.configuration = configuration;
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
                    .Where(x => x.TypeId == type.Id)
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

        public async Task<PlaceTypeDTO> AddType(PlaceTypeDTO dto)
        {
            PlaceType newType = new PlaceType() { Name = dto.name };
            await database.Types.AddAsync(newType);
            await database.SaveChangesAsync();
            PlaceType returnType = await database.Types.FirstAsync(x => x.Name == dto.name);

            return new PlaceTypeDTO()
            {
                id = returnType.Id,
                name = returnType.Name
            };
        }
        public async Task<PlaceDTO> AddPlace(PlaceDTO dto, int typeId)
        {
            Place newPlace = new Place() { Name = dto.name, Coordinates = dto.coordinates, TypeId = typeId };
            await database.Places.AddAsync(newPlace);
            await database.SaveChangesAsync();
            Place returnPlace = await database.Places.FirstAsync(x => x.Name == dto.name);

            return new PlaceDTO()
            {
                id = returnPlace.Id,
                name = returnPlace.Name,
                coordinates = returnPlace.Coordinates
            };
        }
        public async Task<bool> DeleteType(int id)
        {
            PlaceType? type = await database.Types.Include(x=>x.Places).FirstOrDefaultAsync(x => x.Id == id);
            if (type == null)
            {
                return false;
            }

            var collection = mongo.GetCollection<Marker>(configuration["Mongo:MarkersCollection"]);

            foreach(var place in type.Places)
            {
                var builder = Builders<Marker>.Filter;

                FilterDefinition<Marker> filter = builder.Where(x => x.PlaceId == place.Id);

                await collection.DeleteManyAsync(filter);
            }

            database.Types.Remove(type);
            await database.SaveChangesAsync();
            return true;

        }
        public async Task<bool> DeletePlace(int id)
        {
            Place? place = await database.Places.FirstOrDefaultAsync(x => x.Id == id);
            if (place == null)
            {
                return false;
            }

            var collection = mongo.GetCollection<Marker>(configuration["Mongo:MarkersCollection"]);

            var builder = Builders<Marker>.Filter;

            FilterDefinition<Marker> filter = builder.Where(x=>x.PlaceId == place.Id);

            await collection.DeleteManyAsync(filter);

            database.Places.Remove(place);
            await database.SaveChangesAsync();
            return true;
        }

    }
}
