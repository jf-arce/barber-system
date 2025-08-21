using Domain.Entities;
using Domain.Repositories.Base;

namespace Domain.Repositories;

public interface IAppointmentRepository : IGenericRepository<Appointment>
{
    Task<List<Appointment>> FindAllByBarberId(Guid barberId, DateTime? startDate, DateTime? endDate, string? status);
    Task<List<Appointment>> FindAllByUserId(Guid userId, DateTime? startDate, DateTime? endDate, string? status);
}