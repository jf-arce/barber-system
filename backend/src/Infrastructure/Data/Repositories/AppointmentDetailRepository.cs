using Domain.Entities;
using Domain.Repositories;
using Infrastructure.Data.Repositories.Base;

namespace Infrastructure.Data.Repositories;

public class AppointmentDetailRepository : GenericRepository<AppointmentDetail>, IAppointmentDetailRepository
{
    private readonly AppDbContext _db;
    
    public AppointmentDetailRepository (AppDbContext db) : base(db)
    {
        _db = db;
    }
    
    public async Task<List<AppointmentDetail>> AddRange(List<AppointmentDetail> appointmentDetails)
    {
        await _db.AppointmentDetails.AddRangeAsync(appointmentDetails);
        await _db.SaveChangesAsync();
        return appointmentDetails;
    }
}