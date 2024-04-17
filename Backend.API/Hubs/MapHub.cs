using Backend.Application.DTO.Marker;
using Backend.Application.Interfaces;
using Microsoft.AspNetCore.SignalR;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Backend.Hubs
{
    public class MapHub: Hub
    {
        readonly IMapMarkerService markerService;
        readonly IConfiguration configuration;

        public MapHub(IMapMarkerService _markerService, IConfiguration _configuration)
        {
            configuration = _configuration;
            markerService = _markerService;
        }

        public async Task GetMarkers()
        {
            var markers = await markerService.GetMarkersAsync();

            await Clients.Caller.SendAsync("InitMarkers", markers);
        }

        public async Task AddMarker(MarkerDTO marker)
        {
            await markerService.AddMarkerAsync(marker);

            await Clients.AllExcept(Context.ConnectionId).SendAsync("NewMarker", marker);
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            return base.OnDisconnectedAsync(exception);
        }

    }
}
