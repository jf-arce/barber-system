using System.ComponentModel.DataAnnotations;

namespace Domain.Entities;

public class User
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Gender { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public DateOnly BirthDate { get; set; }
    public string? Phone { get; set; }
    public string? Image { get; set; }
    public bool IsDeleted { get; set; } = false;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; } 
    
    public virtual List<Review>? Reviews { get; set; }
    public virtual List<Appointment>? Appointments { get; set; } = [];
    public virtual Barber? Barber { get; set; }

    // Methods
    public string FullName() => $"{Name} {Surname}";
}
