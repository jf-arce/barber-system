using System.ComponentModel.DataAnnotations;

namespace Domain.Entities;

public class UserGender
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}