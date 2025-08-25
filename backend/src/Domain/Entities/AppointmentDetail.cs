using System.ComponentModel.DataAnnotations;

namespace Domain.Entities;

public class AppointmentDetail
{
    [Key]
    public int Id { get; init; }
    public int AppointmentId { get; init; }
    public Guid BarberId { get; init; }
    public int ServiceId { get; init; }
    
    public DateTime StartDateTime { get; set; }
    public DateTime EndDateTime { get; set; }

    public virtual Appointment Appointment { get; init; } = null!;
    public virtual Service Service { get; init; } = null!;
    public virtual Barber Barber { get; init; } = null!;
}