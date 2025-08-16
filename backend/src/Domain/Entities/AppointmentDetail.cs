using System.ComponentModel.DataAnnotations;

namespace Domain.Entities;

public class AppointmentDetail
{
    [Key]
    public int Id { get; init; }
    public int AppointmentId { get; init; }
    public Guid BarberId { get; init; }
    public int ServiceId { get; init; }
    
    public DateTime StartDateTime { get; init; }
    public DateTime EndDateTime { get; init; }

    public virtual Appointment Appointment { get; init; }
    public virtual Service Service { get; init; }
    public virtual Barber Barber { get; init; }
}