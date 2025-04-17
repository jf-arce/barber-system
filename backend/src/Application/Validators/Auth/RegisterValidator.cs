using Application.Dtos.Auth;
using Domain.Enums;
using Domain.Enums.User;
using FluentValidation;

namespace Application.Validators.Auth;

public class RegisterValidator : AbstractValidator<RegisterDto>
{
    public RegisterValidator()
    {
        Include(new LoginValidator());
        
        RuleFor(x => x.Name)
            .NotEmpty()
            .Length(2, 50);
        RuleFor(x => x.Surname)
            .NotEmpty()
            .Length(2, 50);
        RuleFor(x => x.Gender)
            .NotEmpty()
            .Must(value => Enum.GetNames<UserGenderEnum>().Contains(value));
        RuleFor(x => x.Phone)
            .Matches(@"^\+?[0-9]{10,15}$")
            .WithMessage("Phone number must be between 10 and 15 digits long and can start with a '+' sign")
            .When(x => !string.IsNullOrWhiteSpace(x.Phone));
        RuleFor(x => x.BirthDate)
            .NotEmpty()
            .Must(date => date <= DateOnly.FromDateTime(DateTime.Now) && date >= DateOnly.FromDateTime(DateTime.Now.AddYears(-100)))
            .WithMessage("Birth date must be a valid date within the last 100 years and not in the future.");
    }
}
