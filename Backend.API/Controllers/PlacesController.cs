using Backend.Application.DTO.Places;
using Backend.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PlacesController : ControllerBase
    {
        IPlacesService placesService { get; set; }
        public PlacesController(IPlacesService placesService) 
        {
            this.placesService = placesService;
        }

        [HttpGet]
        public async Task<IActionResult> GetPlaces()
        {
            return Ok(await placesService.GetPlaces());
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("type")]
        public async Task<IActionResult> AddType(PlaceTypeDTO dto)
        {
            var returnType = await placesService.AddType(dto);
            return Ok(returnType);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("place/{id}")]
        public async Task<IActionResult> AddPlace(PlaceDTO dto, int id)
        {
            var returnPlace = await placesService.AddPlace(dto, id);
            return Ok(returnPlace);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("type/{id}")]
        public async Task<IActionResult> DeleteType(int id)
        {
            var returnType = await placesService.DeleteType(id);
            return Ok(returnType);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("place/{id}")]
        public async Task<IActionResult> DeletePlace(int id)
        {
            var returnPlace = await placesService.DeletePlace(id);
            return Ok(returnPlace);
        }

    }
}
