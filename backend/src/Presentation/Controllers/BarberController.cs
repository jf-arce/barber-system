using System.Net;
using Application.Dtos.Barbers;
using Application.Exceptions;
using Application.Interfaces;
using Domain.Enums.User;
using Microsoft.AspNetCore.Authorization;
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

    [Authorize(Roles = nameof(UserRolesEnum.Admin))]
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

    [HttpGet]
    public async Task<IActionResult> FindAll()
    {
        try
        {
            var barbers = await _barberService.FindAll();

            var barbersDto = barbers.Select(barber => GetBarberDto.Create(barber)).ToList();
            return Ok(barbersDto);
        }
        catch (Exception ex)
        {
            var handleException = HandleException.Handle(ex);
            return StatusCode(handleException.StatusCode, handleException.Body);
        }
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> FindById(Guid id)
    {
        try
        {
            var barber = await _barberService.FindById(id);
            if (barber == null) throw new CustomHttpException(HttpStatusCode.NotFound, "Barber not found");
            
            return Ok(barber);
        }
        catch (Exception ex)
        {
            var handleException = HandleException.Handle(ex);
            return StatusCode(handleException.StatusCode, handleException.Body);
        }
    }
   
    [Authorize(Roles = $"{nameof(UserRolesEnum.Admin)},{nameof(UserRolesEnum.Barber)}")]
    [HttpPatch]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateBarberDto updateBarberDto)
    {
        try
        {
            var barber = await _barberService.FindById(id);
            if (barber == null) throw new CustomHttpException(HttpStatusCode.NotFound, "Barber not found");
            
            await _barberService.Update(id, updateBarberDto);
            return Ok("Barber updated successfully");
        }
        catch (Exception ex)
        {
            var handleException = HandleException.Handle(ex);
            return StatusCode(handleException.StatusCode, handleException.Body);
        }
    }
}