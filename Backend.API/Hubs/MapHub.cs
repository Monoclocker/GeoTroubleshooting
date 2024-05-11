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
        IConfiguration configuration;

        public MapHub(IMapMarkerService markerService, IConfiguration configuration)
        {
            this.markerService = markerService;
            this.configuration = configuration;
        }
        public override async Task OnConnectedAsync()
        {

            await Groups.AddToGroupAsync(Context.ConnectionId, "Liquidator");

            await base.OnConnectedAsync();

        }

        public async Task AddMarker(MarkerCreateDTO marker)
        {

            MarkerInfoDTO newMarker = await markerService.AddMarkerAsync(marker);

            await Clients.Group("Explorer").SendAsync("NewMarker", newMarker);

        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            return base.OnDisconnectedAsync(exception);
        }

    }
}
