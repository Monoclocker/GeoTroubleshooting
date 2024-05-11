using Backend.Domain;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.IdGenerators;

namespace Backend.External.Data
{
    public class MongoMapper
    {
        public void Map()
        {
            BsonClassMap.RegisterClassMap<Marker>(cm =>
            {
                cm.MapIdMember(x => x.Id);
                cm.MapMember(x => x.UserId).SetIsRequired(true);
                cm.MapMember(x=>x.PlaceId).SetIsRequired(true);
                cm.MapMember(x => x.Name);
                //cm.MapMember(x => x.Tags);
                cm.MapMember(x => x.TimeStamp);
                cm.MapMember(x => x.Description);
                cm.MapMember(x => x.Coordinates).SetIsRequired(true);
                cm.MapMember(x => x.TimeStamp).SetIsRequired(true);
                cm.MapMember(x => x.Attachments).SetIsRequired(true);
            });
        }
    }
}
