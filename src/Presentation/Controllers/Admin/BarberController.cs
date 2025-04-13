using Application.Dtos.Barber;
using Application.Exceptions;
using Application.Interfaces;
using Domain.Enums.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers.Admin;

[Authorize(Roles = nameof(UserRolesEnum.Admin))]
[Route("api/admin/barbers")]
[ApiController]
public class BarberController : ControllerBase
{
    private readonly IBarberService _barberService;
    
    public BarberController(IBarberService barberService)
    {
        _barberService = barberService;
    }
    
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateBarberDto createBarberDto)
    {
        try
        {
            await _barberService.Create(createBarberDto);
            return Ok("Barber created successfully");
        }
        catch (Exception ex)
        {
            var handleException = HandleException.Handle(ex);
            return StatusCode(handleException.StatusCode, handleException.Body);
        }
    }
}