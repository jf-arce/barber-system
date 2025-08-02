using System.ComponentModel.DataAnnotations;

namespace Domain.Entities;

public class BarberWorkSchedule
{
    [Key]
    public int Id { get; set; }
    public DayOfWeek DayOfWeek { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }

    public Guid BarberId { get; set; }
    public virtual Barber Barber { get; set; }
}