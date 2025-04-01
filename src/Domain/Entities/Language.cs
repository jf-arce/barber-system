using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

public class Language
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public virtual List<Barber>? Barbers { get; set; }
}