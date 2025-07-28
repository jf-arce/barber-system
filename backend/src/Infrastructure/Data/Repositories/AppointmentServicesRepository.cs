using Domain.Entities;
using Domain.Repositories;
using Infrastructure.Data.Repositories.Base;

namespace Infrastructure.Data.Repositories;

public class AppointmentServicesRepository : GenericRepository<AppointmentServices>, IAppointmentServicesRepository
{
    private readonly AppDbContext _db;
    
    public AppointmentServicesRepository (AppDbContext db) : base(db)
    {
        _db = db;
    }
    
    public async Task<List<AppointmentServices>> AddRange(List<AppointmentServices> appointmentServices)
    {
        await _db.AppointmentServices.AddRangeAsync(appointmentServices);
        await _db.SaveChangesAsync();
        return appointmentServices;
    }
}