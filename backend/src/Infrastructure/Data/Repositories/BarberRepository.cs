using Domain.Entities;
using Domain.Enums;
using Domain.Repositories;
using Domain.Repositories.Base;
using Infrastructure.Data.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repositories;

public class BarberRepository : GenericRepository<Barber>, IBarberRepository
{
    private readonly AppDbContext _db;

    public BarberRepository(AppDbContext db) : base(db)
    {
        _db = db;
    }
    
    public override async Task<List<Barber>> FindAll()
    {
        return await _db.Barbers
            .Include(b => b.User)
            .Include(b => b.Services)
            .Include(b => b.SocialNetworks)
            .ToListAsync();
    }

    public override async Task<Barber?> FindById(object id)
    {
        return await _db.Barbers.Include(b => b.User)
            .Include(b => b.Services)
            .Include(b => b.SocialNetworks)
            .FirstOrDefaultAsync(b => b.UserId == (Guid)id);
    }

    public async Task<List<Barber>> FindAllAvailableBarbers(DateTime appointmentStart, int serviceDurationHours)
    {
        var dayOfWeek = appointmentStart.DayOfWeek;
        var appointmentEnd = appointmentStart.AddHours(serviceDurationHours);

        var availableBarbers = await _db.Barbers
            // Filtramos Barberos que trabajan ese día y horario
            .Where(b => b.BarberWorkSchedules.Any(bws =>
                bws.DayOfWeek == dayOfWeek &&
                bws.StartTime <= appointmentStart.TimeOfDay &&
                bws.EndTime >= appointmentEnd.TimeOfDay
            ))
            // Filtramos Barberos que no tienen citas en ese horario
            /* Ej: Si la cita a asignar es de 2 horas, no puede haber una cita que empiece antes del fin de la cita a asignar
               y termine después de que empiece la cita a asignar.
            */
            .Where(b => !b.AppointmentDetails
                .Any(ad => ad.Appointment.Status != AppointmentStatusEnum.Cancelado.ToString() &&
                           ad.Appointment.Status != AppointmentStatusEnum.Completado.ToString() &&
                           ad.StartDateTime < appointmentEnd &&
                           ad.EndDateTime > appointmentStart
                           ))
            .Include(b => b.AppointmentDetails)
            .Include(b => b.Services)
            .ToListAsync();

        return availableBarbers;
    }

    public Task<bool> IsBarberAvailable(Guid barberId, DateTime appointmentStart, int serviceDurationHours)
    {
        var appointmentEnd = appointmentStart.AddHours(serviceDurationHours);

        return _db.Barbers
            .Where(b => b.UserId == barberId)
            .Select(b => !b.AppointmentDetails
                .Any(ad => ad.Appointment.Status != AppointmentStatusEnum.Cancelado.ToString() &&
                           ad.Appointment.Status != AppointmentStatusEnum.Completado.ToString() &&
                           ad.StartDateTime < appointmentEnd &&
                           ad.EndDateTime > appointmentStart
                ))
            .FirstOrDefaultAsync();
        // Devuelve true si el barbero está disponible, false si no lo está.
    }

    public Task<List<Barber>> FindAllByIds(List<Guid> barberIds)
    {
        return _db.Barbers
            .Where(b => barberIds.Contains(b.UserId))
            .Include(b => b.Services)
            .ToListAsync();
    }
    
    public async Task<List<Guid>> GetBarbersForService(int serviceId)
    {
        return await _db.Barbers
            .Where(b => b.Services.Any(s => s.Id == serviceId))
            .Select(b => b.UserId) // Solo devolvemos el ID del barbero
            .ToListAsync();
    }
}