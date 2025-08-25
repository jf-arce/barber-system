using Domain.Entities;
using Domain.Enums;
using Domain.Repositories;
using Infrastructure.Data.Repositories.Base;
using Microsoft.EntityFrameworkCore;

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
    
    public async Task<List<AppointmentDetail>> GetAppointmentDetailsByDateRange(DateTime startUtc, DateTime endUtc)
    {
        return await _db.AppointmentDetails
            .Include(ad => ad.Appointment) // Incluimos la cita para poder acceder al estado
            .Where(ad => ad.StartDateTime >= startUtc && ad.StartDateTime < endUtc)
            .Where(ad => ad.Appointment.Status != AppointmentStatusEnum.Cancelado.ToString()
                         && ad.Appointment.Status != AppointmentStatusEnum.Completado.ToString())
            .ToListAsync();
    }
}