using System.ComponentModel.DataAnnotations;

namespace Domain.Entities;

public class AppointmentServices
{
    public int AppointmentId { get; set; }
    public int ServiceId { get; set; }
    public Guid BarberId { get; set; }

    public virtual Appointment Appointment { get; set; }
    public virtual Service Service { get; set; }
    public virtual Barber Barber { get; set; }
}