using System.Net;
using Application.Dtos.Appointments;
using Application.Exceptions;
using Application.Interfaces;
using Domain.Entities;
using Domain.Enums;
using Domain.Repositories;

namespace Application.Services;

public class AppointmentService : IAppointmentService
{
    private readonly IAppointmentRepository _appointmentRepository;
    private readonly IServiceRepository _serviceRepository;
    private readonly IAppointmentServicesRepository _appointmentServiceRepository;

    public AppointmentService(
        IAppointmentRepository appointmentRepository, 
        IServiceRepository serviceRepository,
        IAppointmentServicesRepository appointmentServicesRepository)
    {
        _appointmentRepository = appointmentRepository;
        _serviceRepository = serviceRepository;
        _appointmentServiceRepository = appointmentServicesRepository;
    }
    
    public async Task Create(CreateAppointmentDto createAppointmentDto)
    {
        var services = await _serviceRepository
            .FindByMultipleIds(createAppointmentDto.Services
                .Select(s => s.ServiceId).ToList());

        if (services.Count != createAppointmentDto.Services.Count)
            throw new CustomHttpException(HttpStatusCode.BadRequest, "One or more services not found"); 

        var newAppointment = new Appointment
        {
            DateTime = createAppointmentDto.DateTime,
            UserId = createAppointmentDto.UserId
        };
        
        await _appointmentRepository.Create(newAppointment);
        
        var appointmentServices = createAppointmentDto.Services
            .Select(serv => new AppointmentServices
            {
                AppointmentId = newAppointment.Id,
                ServiceId = serv.ServiceId,
                BarberId = serv.BarberId
            }).ToList();
        
        await _appointmentServiceRepository.AddRange(appointmentServices);
    }

    public async Task<List<Appointment>> FindAllByBarberId(Guid barberId, DateTime? startDate, DateTime? endDate, string? status)
    {
        var appointments = await _appointmentRepository.FindAllByBarberId(barberId, startDate, endDate, status);
        
        if (appointments.Count == 0) throw new CustomHttpException(HttpStatusCode.NotFound, "Appointments not found");
        return appointments;
    }

    public async Task<List<Appointment>> FindAllByUserId(Guid userId, DateTime? startDate, DateTime? endDate, string? status)
    {
        var appointments = await _appointmentRepository.FindAllByUserId(userId, startDate, endDate, status);
        
        if (appointments.Count == 0) throw new CustomHttpException(HttpStatusCode.NotFound, "Appointments not found");
        return appointments;
    }

    public async Task<Appointment> FindById(int id)
    {
        var appointment = await _appointmentRepository.FindById(id);
        
        if (appointment == null) throw new CustomHttpException(HttpStatusCode.NotFound, "Appointment not found");
        return appointment;
    }

    public async Task ChangeStatus(int id, string newStatus)
    { 
        //TODO: Validar que exista el status en el enum
        
       var appointment = await _appointmentRepository.FindById(id); 
       if (appointment == null) throw new CustomHttpException(HttpStatusCode.NotFound, "Appointment not found");

       appointment.Status = newStatus;

       await _appointmentRepository.Update(appointment);
    }

    public async Task Reschedule(int id, DateTime newDateTime)
    {
        var appointment = await _appointmentRepository.FindById(id);
        if (appointment == null) throw new CustomHttpException(HttpStatusCode.NotFound, "Appointment not found");

        appointment.DateTime = newDateTime;
        
        await _appointmentRepository.Update(appointment);
    }

    public Task Notify()
    {
        throw new NotImplementedException();
    }
}