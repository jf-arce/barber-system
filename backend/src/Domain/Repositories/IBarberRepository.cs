using Domain.Entities;
using Domain.Repositories.Base;

namespace Domain.Repositories;

public interface IBarberRepository : IGenericRepository<Barber>
{
    public Task<List<Barber>> FindAllAvailableBarbers(DateTime appointmentDateTime,
        int serviceDurationHours);
    
    public Task<bool> IsBarberAvailable(Guid barberId, DateTime appointmentDateTime, int serviceDurationHours);
    public Task<List<Barber>> FindAllByIds(List<Guid> barberIds);
    
    Task<List<Guid>> GetBarbersForService(int serviceId);
}