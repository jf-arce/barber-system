using Application.Dtos.Barber;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers;

[Route("api/barbers")]
[ApiController]
public class BarberController : ControllerBase
{
    private readonly IBarberService _barberService;
    
    public BarberController(IBarberService barberService)
    {
        _barberService = barberService;
    }

    [HttpGet]
    public async Task<IActionResult> FindAll()
    {
        try
        {
            var barbers = await _barberService.FindAll();

            var barbersDto = barbers.Select(barber => GetBarberDto.Create(barber)).ToList();
            return Ok(barbersDto);
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> FindById(int id)
    {
        var barber = await _barberService.FindById(id);
        if (barber == null) return NotFound("Barber not found");
        
        return Ok(barber);
    }
}