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
    public Guid UserId { get; set; }
    
    public virtual User User { get; set; } = null!;
    public virtual List<AppointmentServices> AppointmentServices { get; set; } = [];
}