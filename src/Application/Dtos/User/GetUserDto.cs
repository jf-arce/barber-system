namespace Application.Dtos.User;

public class GetUserDto
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string Gender { get; set; } = string.Empty;
    public DateTime BirthDate { get; set; } = DateTime.MinValue;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string Role { get; set; } = string.Empty;
}
