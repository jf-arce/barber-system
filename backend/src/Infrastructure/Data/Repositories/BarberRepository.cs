using Domain.Entities;
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

    public async Task<List<Barber>> FindAllAvailableBarbers(DateTime appointmentDateTime, int serviceDurationHours)
    {
        var dayOfWeek = appointmentDateTime.DayOfWeek;
        var appointmentStart = appointmentDateTime;
        var appointmentEnd = appointmentDateTime.AddHours(serviceDurationHours);

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
            .Where(b => !b.AppointmentServices.Any(aserv =>
                aserv.Appointment.DateTime < appointmentEnd &&
                aserv.Appointment.DateTime.AddHours(aserv.Service.Duration) > appointmentStart 
            ))
            .Include(b => b.AppointmentServices)
                .ThenInclude(aserv => aserv.Appointment)
            .ToListAsync();

        return availableBarbers;
    }

    public Task<bool> IsBarberAvailable(Guid barberId, DateTime appointmentDateTime, int serviceDurationHours)
    {
        var appointmentStart = appointmentDateTime;
        var appointmentEnd = appointmentDateTime.AddHours(serviceDurationHours);
        
        return _db.Barbers
            .Where(b => b.UserId == barberId)
            .Select(b => !b.AppointmentServices.Any(aserv =>
                aserv.Appointment.DateTime < appointmentEnd &&
                aserv.Appointment.DateTime.AddHours(aserv.Service.Duration) > appointmentStart))
            .FirstOrDefaultAsync();
        
            // Devuelve true si el barbero esta disponible, false si no lo es.
    }

    public Task<List<Barber>> FindAllByIds(List<Guid> barberIds)
    {
        return _db.Barbers
            .Where(b => barberIds.Contains(b.UserId))
            .ToListAsync();
    }
}