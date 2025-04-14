using Application.Dtos.Services;
using Application.Exceptions;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers;

[Authorize]
[Route("api/services")]
[ApiController]
public class ServiceController : ControllerBase
{
    private readonly IServiceService _serviceService;
    
    public ServiceController(IServiceService serviceService)
    {
        _serviceService = serviceService;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateServiceDto createServiceDto)
    {
        try
        {
           await _serviceService.Create(createServiceDto);
           return Ok("Service created successfully");
        }
        catch (Exception e)
        {
            var handleException = HandleException.Handle(e);
            return StatusCode(handleException.StatusCode, handleException.Body);
        }
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var services = await _serviceService.FindAll();
            return Ok(services);
        }
        catch (Exception e)
        {
            var handleException = HandleException.Handle(e);
            return StatusCode(handleException.StatusCode, handleException.Body);
        }
    }
    
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        try
        {
            var service = await _serviceService.FindById(id);
            return Ok(service);
        }
        catch (Exception e)
        {
            var handleException = HandleException.Handle(e);
            return StatusCode(handleException.StatusCode, handleException.Body);
        }
    }
    
    [HttpPatch("{id:int}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateServiceDto updateServiceDto)
    {
        try
        {
            await _serviceService.Update(id, updateServiceDto);
            return Ok("Service updated successfully");
        }
        catch (Exception e)
        {
            var handleException = HandleException.Handle(e);
            return StatusCode(handleException.StatusCode, handleException.Body);
        }
    }
    
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        try
        {
            await _serviceService.Delete(id);
            return Ok("Service deleted successfully");
        }
        catch (Exception e)
        {
            var handleException = HandleException.Handle(e);
            return StatusCode(handleException.StatusCode, handleException.Body);
        }
    }
    
}