using Backend.Application.DTO.Marker;
using Backend.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace Backend.Hubs
{
    public class MapHub: Hub
    {
        readonly IMapMarkerService markerService;

        public MapHub(IMapMarkerService markerService)
        {
            this.markerService = markerService;
        }
        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();

        }

        public async Task AddMarker(MarkerCreateDTO marker)
        {

            MarkerInfoDTO newMarker = await markerService.AddMarkerAsync(marker);

            await Clients.All.SendAsync("NewMarker", newMarker);

        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            return base.OnDisconnectedAsync(exception);
        }

    }
}
