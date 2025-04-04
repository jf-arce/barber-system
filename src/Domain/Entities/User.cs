namespace Domain.Entities;

public class User : UserBase
{
    public virtual List<Review>? Reviews { get; set; }
    public virtual List<Appointment>? Appointments { get; set; } = [];

    // Methods
    public string FullName() => $"{Name} {Surname}";
}
