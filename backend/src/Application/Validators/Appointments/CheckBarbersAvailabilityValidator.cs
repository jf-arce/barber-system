using Application.Dtos.Appointments;
using FluentValidation;

namespace Application.Validators.Appointments;

public class CheckBarbersAvailabilityValidator : AbstractValidator<CheckBarbersAvailabilityDto>
{
    public CheckBarbersAvailabilityValidator()
    {
        RuleFor(x => x.Date)
            .NotEmpty()
            .WithMessage("La fecha de la cita no puede estar vacía");

        RuleFor(x => x.ServicesWithBarberDto)
            .NotEmpty()
            .WithMessage("Debe especificar al menos un servicio");

        RuleFor(x => x.AssignBarberAutomatically)
            .NotNull()
            .WithMessage("Debe especificar si se asigna el barbero automáticamente")
            .When(x => x.ServicesWithBarberDto.Count != 0);

        // Validación siempre para ServiceId
        RuleForEach(x => x.ServicesWithBarberDto)
            .ChildRules(s =>
            {
                s.RuleFor(service => service.ServiceId)
                    .GreaterThan(0)
                    .WithMessage("ServiceId debe ser un número válido mayor a 0");
            });

        // Validación condicional para BarberId
        RuleForEach(x => x.ServicesWithBarberDto)
            .ChildRules(s =>
            {
                s.RuleFor(service => service.BarberId)
                    .NotEmpty()
                    .WithMessage("El barbero no puede ser nulo cuando AssignBarberAutomatically es falso");
            }).When(x => !x.AssignBarberAutomatically);
    }
}