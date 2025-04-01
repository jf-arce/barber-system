using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

public class Work
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Image { get; set; } = string.Empty;
    public string? Description { get; set; } = string.Empty;

    [ForeignKey("Barber")]
    public Guid BarberId { get; set; }
    public virtual Barber Barber { get; set; } = null!;
}