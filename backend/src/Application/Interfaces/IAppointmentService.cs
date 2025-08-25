using Application.Dtos.Appointments;
using Domain.Entities;

namespace Application.Interfaces;

public interface IAppointmentService
{
    Task Create(CreateAppointmentDto createAppointmentDto);
    Task<List<Appointment>> FindAllByBarberId(Guid barberId, DateTime? startDate, DateTime? endDate, string? status);
    Task<List<Appointment>> FindAllByUserId(Guid userId, DateTime? startDate, DateTime? endDate, string? status);
    Task<Appointment> FindById(int id);
    Task ChangeStatus(int id, string newStatus);
    Task Reschedule(int id, DateTime newDateTime);
    Task Notify();
    Task<GetBarbersAvailabilityDto> GetBarbersAvailability(CheckBarbersAvailabilityDto dto);
    Task Cancel (int id);
}