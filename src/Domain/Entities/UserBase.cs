using System.ComponentModel.DataAnnotations;

namespace Domain.Entities;

public abstract class UserBase
{
    [Key]
    public Guid Id { get; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Gender { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public bool IsDeleted { get; set; } = false;
    public DateOnly BirthDate { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
