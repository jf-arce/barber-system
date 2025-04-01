using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Enums;

namespace Domain.Entities;

public class Appointment
{
    [Key]
    public int Id { get; set; }
    public DateTime DateTime { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string Status { get; set; } = AppointmentStatusEnum.Confirmado.ToString();

    [ForeignKey("Barber")]
    public Guid BarberId { get; set; }
    public virtual Barber Barber { get; set; } = null!;

    [ForeignKey("User")]
    public Guid UserId { get; set; }
    public virtual User User { get; set; } = null!;

    [ForeignKey("Service")]
    public int ServiceId { get; set; }
    public virtual Service Service { get; set; } = null!;
}