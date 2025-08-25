using Application.Dtos.Appointments;
using Application.Exceptions;
using Application.Interfaces;
using Application.Validators.Appointments;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers;

[Authorize]
[Route("api/appointments")]
[ApiController]
public class AppointmentController : ControllerBase
{
    private readonly IAppointmentService _appointmentService;
    
    public AppointmentController(IAppointmentService appointmentService)
    {
        _appointmentService = appointmentService;
    }
    
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateAppointmentDto createAppointmentDto)
    {
        try
        {
            var validator = new CreateAppointmentValidator();
            await validator.ValidateAndThrowAsync(createAppointmentDto);
            
            await _appointmentService.Create(createAppointmentDto);
            return StatusCode(201, new { message = "Appointment created successfully" });
        }
        catch (Exception ex)
        {
            var handleException = HandleException.Handle(ex);
            return StatusCode(handleException.StatusCode, handleException.Body);
        }
    }
    
    [HttpGet("barber/{barberId:guid}")]
    public async Task<IActionResult> FindAllByBarberId(
        Guid barberId, 
        [FromQuery] DateTime? startDate, 
        [FromQuery] DateTime? endDate, 
        [FromQuery] string? status
    )
    {
        try
        {
            var appointments = await _appointmentService.FindAllByBarberId(barberId, startDate, endDate, status);
            var appointmentsDto = appointments.Select(appointment => GetAppointmentDto.Create(appointment)).ToList();
            return Ok(appointmentsDto);
        }
        catch (Exception ex)
        {
            var handleException = HandleException.Handle(ex);
            return StatusCode(handleException.StatusCode, handleException.Body);
        }
    }
    
    [HttpGet("user/{userId:guid}")]
    public async Task<IActionResult> FindAllByUserId(
        Guid userId, 
        [FromQuery] DateTime? startDate, 
        [FromQuery] DateTime? endDate, 
        [FromQuery] string? status
    )
    {
        try
        {
            var appointments = await _appointmentService.FindAllByUserId(userId, startDate, endDate, status);
            
            var appointmentsDto = appointments.Select(appointment => GetAppointmentDto.Create(appointment)).ToList();
            return Ok(appointmentsDto);
        }
        catch (Exception ex)
        {
            var handleException = HandleException.Handle(ex);
            return StatusCode(handleException.StatusCode, handleException.Body);
        }
    }
    
    [HttpGet("{id:int}")]
    public async Task<IActionResult> FindById(int id)
    {
        try
        {
            var appointment = await _appointmentService.FindById(id);
            var appointmentDto = GetAppointmentDto.Create(appointment);
            return Ok(appointmentDto);
        }
        catch (Exception ex)
        {
            var handleException = HandleException.Handle(ex);
            return StatusCode(handleException.StatusCode, handleException.Body);
        }
    }
    
    [HttpPatch("{id}/status")]
    public async Task<IActionResult> ChangeStatus(string id, [FromBody] string newStatus)
    {
        try
        {
            await _appointmentService.ChangeStatus(int.Parse(id), newStatus);
            return Ok("Appointment status changed successfully");
        }
        catch (Exception ex)
        {
            var handleException = HandleException.Handle(ex);
            return StatusCode(handleException.StatusCode, handleException.Body);
        }
    }
    
    [HttpPost("barbers-availability")]
    public async Task<IActionResult> GetBarbersAvailability([FromBody] CheckBarbersAvailabilityDto checkBarbersAvailabilityDto)
    {
        try
        {
            var validator = new CheckBarbersAvailabilityValidator();
            await validator.ValidateAndThrowAsync(checkBarbersAvailabilityDto);
            
            var result = await _appointmentService.GetBarbersAvailability(checkBarbersAvailabilityDto);
            return Ok(result);
        }
        catch (Exception ex)
        {
            var handleException = HandleException.Handle(ex);
            return StatusCode(handleException.StatusCode, handleException.Body);
        }
    }
    
    [HttpPatch("{id:int}/cancel")]
    public async Task<IActionResult> Cancel(int id)
    {
        try
        {
            await _appointmentService.Cancel(id);
            return Ok(new { message = "Appointment canceled successfully" });
        }
        catch (Exception ex)
        {
            var handleException = HandleException.Handle(ex);
            return StatusCode(handleException.StatusCode, handleException.Body);
        }
    }
    
    [HttpPatch("{id:int}/reschedule")]
    public async Task<IActionResult> Reschedule(int id, [FromBody] RescheduleAppointmentDto rescheduleDto)
    {
        try
        {
            await _appointmentService.Reschedule(id, rescheduleDto.NewDateTime);
            return Ok(new { message = "Appointment rescheduled successfully" });
        }
        catch (Exception ex)
        {
            var handleException = HandleException.Handle(ex);
            return StatusCode(handleException.StatusCode, handleException.Body);
        }
    }
}