using Backend.Application.DTO.Marker;
using Backend.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class MapController : ControllerBase
    {
        IMapMarkerService markerService;

        public MapController(IMapMarkerService markerService)
        {
            this.markerService = markerService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetMarkers(
            [FromQuery] long startTimestamp,
            [FromQuery] long endTimestamp,
            [FromQuery] int placeId,
            [FromQuery] string? markerId)
        {

            var markers = await markerService.GetMarkersAsync(new MarkersGetDTO() { 
                startTimestamp = new DateTime(1970, 1, 1, 0, 0, 0, 0).AddSeconds(startTimestamp), 
                endTimestamp = new DateTime(1970, 1, 1, 0, 0, 0, 0).AddSeconds(endTimestamp), 
                placeId = placeId,
                markerId = markerId
            });

            return Ok(markers);
        }
    }
}
