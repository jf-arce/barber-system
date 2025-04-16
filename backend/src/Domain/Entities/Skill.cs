using System.ComponentModel.DataAnnotations;

namespace Domain.Entities;

public class Skill
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }

    public virtual List<Barber>? Barbers { get; set; }
    public virtual List<Service>? Services { get; set; } = [];
}