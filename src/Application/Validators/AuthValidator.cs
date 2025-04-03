using Application.Dtos;
using Domain.Enums;
using FluentValidation;

namespace Application.Validators;

public class AuthValidator : AbstractValidator<AuthDto>
{
    public AuthValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .Length(2, 50);
        RuleFor(x => x.Surname)
            .NotEmpty()
            .Length(2, 50);
        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress()
            .Length(5, 100);
        RuleFor(x => x.Password)
            .NotEmpty()
            .MinimumLength(8)
            .Matches(@"[A-Z]").WithMessage("The password must contain at least one uppercase letter")
            .Matches(@"\d").WithMessage("The password must contain at least one number");
        RuleFor(x => x.Gender)
            .NotEmpty()
            .Must(value => Enum.GetNames(typeof(GenderEnum)).Contains(value));
        RuleFor(x => x.Phone)
            .Matches(@"^\+?[0-9]{10,15}$").WithMessage("Phone number must be between 10 and 15 digits long and can start with a '+' sign");
        RuleFor(x => x.BirthDate)
            .NotEmpty()
            .Must(date => date <= DateOnly.FromDateTime(DateTime.Now) && date >= DateOnly.FromDateTime(DateTime.Now.AddYears(-100)))
            .WithMessage("Birth date must be a valid date within the last 100 years and not in the future.");
    }
}
