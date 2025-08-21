using Domain.Entities;
using Domain.Repositories.Base;

namespace Domain.Repositories;

public interface IAppointmentDetailRepository : IGenericRepository<AppointmentDetail>
{
    Task<List<AppointmentDetail>> AddRange(List<AppointmentDetail> appointmentDetails);
    Task<List<AppointmentDetail>> GetAppointmentDetailsByDateRange(DateTime startUtc, DateTime endUtc);
}