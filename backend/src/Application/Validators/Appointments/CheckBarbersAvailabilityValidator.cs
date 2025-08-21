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

        RuleForEach(x => x.ServicesWithBarberDto)
            .ChildRules(s =>
            {
                s.RuleFor(service => service.ServiceId)
                    .GreaterThan(0)
                    .WithMessage("ServiceId debe ser un número válido mayor a 0");

                s.RuleFor(service => service.BarberId)
                    .NotEmpty()
                    .WithMessage("El barbero no puede ser nulo");
            });
    }
}