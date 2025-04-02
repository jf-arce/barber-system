using System.ComponentModel.DataAnnotations;

namespace Domain.Entities;

public class Work
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Image { get; set; } = string.Empty;
    public string? Description { get; set; } = string.Empty;
    public Guid BarberId { get; set; }
    
    public virtual Barber Barber { get; set; } = null!;
}