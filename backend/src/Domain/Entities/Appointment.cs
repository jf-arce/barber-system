using System.ComponentModel.DataAnnotations;
using Domain.Enums;

namespace Domain.Entities;

public class Appointment
{
    [Key]
    public int Id { get; init; }
    public DateTime CreatedAt { get; init; }
    public DateTime UpdatedAt { get; init; }
    public string Status { get; set; } = AppointmentStatusEnum.Confirmado.ToString();
    public Guid UserId { get; init; }
    
    public virtual User User { get; init; } = null!;
    public virtual List<AppointmentDetail> AppointmentDetails { get; init; } = [];
}