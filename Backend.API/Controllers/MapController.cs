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

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> GetMarkers(MarkersGetDTO dto)
        {
            var markers = await markerService.GetMarkersAsync(dto);

            return Ok(markers);
        }
    }
}
