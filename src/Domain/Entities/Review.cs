using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

public class Review
{
    [Key]
    public int Id { get; set; }
    public int Rating { get; set; } = 0; // 0-5
    public string Comment { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [ForeignKey("User")]
    public Guid UserId { get; set; }
    public virtual User User { get; set; } = null!;

    [ForeignKey("Barber")]
    public Guid BarberId { get; set; }
    public virtual Barber Barber { get; set; } = null!;
}