using System.ComponentModel.DataAnnotations;

namespace Domain.Entities;

public class Service
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public float Price { get; set; }
    public int Duration { get; set; } // Duration in hours
    
    public virtual List<Skill> Skills { get; set; } = [];
    public virtual List<Appointment>? Appointments { get; set; } = [];
}