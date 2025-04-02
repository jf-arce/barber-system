using System.ComponentModel.DataAnnotations;
using Domain.Enums;

namespace Domain.Entities;

public class Appointment
{
    [Key]
    public int Id { get; set; }
    public DateTime DateTime { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string Status { get; set; } = AppointmentStatusEnum.Confirmed.ToString();
    public Guid UserId { get; set; }
    public Guid BarberId { get; set; }
    public int ServiceId { get; set; }

    public virtual User User { get; set; } = null!;
    public virtual Barber Barber { get; set; } = null!;
    public virtual Service Service { get; set; } = null!;
}