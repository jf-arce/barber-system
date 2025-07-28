using Domain.Entities;
using Domain.Repositories.Base;

namespace Domain.Repositories;

public interface IAppointmentServicesRepository : IGenericRepository<AppointmentServices>
{
    Task<List<AppointmentServices>> AddRange(List<AppointmentServices> appointmentServices);
}