using Domain.Entities;
using Domain.Repositories;
using Infrastructure.Data.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repositories;

public class AppointmentRepository : GenericRepository<Appointment>, IAppointmentRepository
{
    private readonly AppDbContext _db;

    public AppointmentRepository(AppDbContext db) : base(db)
    {
        _db = db;
    }
    
    public async Task<List<Appointment>> FindAllByBarberId(Guid barberId, DateTime? startDate, DateTime? endDate, string? status)
    {
       var appointments =  await _db.Appointments
           .Include(a => a.Services)
           .Where(a => a.BarberId == barberId)
           .Where(a => startDate == null || a.DateTime >= startDate)
           .Where(a => endDate == null || a.DateTime <= endDate)
           .Where(a => string.IsNullOrEmpty(status) || a.Status.ToString() == status)
           .ToListAsync();

       return appointments;
    }

    public async Task<List<Appointment>> FindAllByUserId(Guid userId, DateTime? startDate, DateTime? endDate,
        string? status)
    {
        var appointments = await _db.Appointments
            .Include(a => a.Services)
            .Where(a => a.UserId == userId)
            .Where(a => startDate == null || a.DateTime >= startDate)
            .Where(a => endDate == null || a.DateTime <= endDate)
            .Where(a => string.IsNullOrEmpty(status) || a.Status.ToString() == status)
            .ToListAsync();

        return appointments;
    }
}