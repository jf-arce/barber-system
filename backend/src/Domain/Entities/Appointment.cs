using System.ComponentModel.DataAnnotations;
using Domain.Enums;

namespace Domain.Entities;

public class Appointment
{
    [Key]
    public int Id { get; set; }
    public DateTime DateTime { get; set; }
    public DateTime CreatedAt { get; set; }
    public string Status { get; set; } = AppointmentStatusEnum.Confirmed.ToString();
    public int ServiceId { get; set; }
    public Guid UserId { get; set; }
    public Guid BarberId { get; set; }

    public virtual Service Service { get; set; } = null!;
    public virtual User User { get; set; } = null!;
    public virtual Barber Barber { get; set; } = null!;
}