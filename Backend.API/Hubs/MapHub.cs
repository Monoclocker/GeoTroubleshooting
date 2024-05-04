﻿using Backend.Application.DTO.Marker;
using Backend.Application.Interfaces;
using Microsoft.AspNetCore.SignalR;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Backend.Hubs
{
    public class MapHub: Hub
    {
        readonly IMapMarkerService markerService;

        public MapHub(IMapMarkerService markerService)
        {
            this.markerService = markerService;
        }

        public async Task GetMarkers(MarkersGetDTO dto)
        {
            var markers = await markerService.GetMarkersAsync(dto);

            await Clients.Caller.SendAsync("InitMarkers", markers);
        }

        public async Task AddMarker(MarkerCreateDTO marker)
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
