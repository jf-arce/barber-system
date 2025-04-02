using System.ComponentModel.DataAnnotations;

namespace Domain.Entities;

public class SocialNetwork
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;

    public virtual List<Barber>? Barbers { get; set; }
}