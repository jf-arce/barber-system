using System.ComponentModel.DataAnnotations;

namespace Domain.Entities;

public class Review
{
    [Key]
    public int Id { get; set; }
    public int Rating { get; set; } = 0; // 0-5
    public string Comment { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public Guid UserId { get; set; }
    public Guid BarberId { get; set; }
    
    public virtual User User { get; set; } = null!;
    public virtual Barber Barber { get; set; } = null!;
}