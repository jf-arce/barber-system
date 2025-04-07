using Application.Dtos.Barber;
using Application.Interfaces;
using Domain.Entities;
using Domain.Enums.User;
using Domain.Repositories;

namespace Application.Services;

public class BarberService : IBarberService
{
    private readonly IBarberRepository _barberRepository;
    private readonly IUserRepository _userRepository;
    
    public BarberService(IBarberRepository barberRepository, IUserRepository userRepository)
    {
        _barberRepository = barberRepository;
        _userRepository = userRepository;
    }
    
    public async Task<List<Barber>> FindAll()
    {
        var barbers = await _barberRepository.FindAll();
        if (barbers.Count == 0) throw new Exception("No barbers found");
        
        return barbers;
    }

    public async Task<Barber?> FindById(int id)
    {
        var barber = await _barberRepository.FindById(id);
        if (barber == null) throw new Exception("Barber not found");
        
        return barber;
    }

    public async Task Create(CreateBarberDto createBarberDto)
    {
        var user = new User
        {
            Name = createBarberDto.Name,
            Surname = createBarberDto.Surname,
            Email = createBarberDto.Email,
            Password = createBarberDto.Password,
            Gender = createBarberDto.Gender,
            Role = UserRolesEnum.Barber.ToString(),
            Phone = createBarberDto.Phone ?? null,
            BirthDate = createBarberDto.BirthDate,
        };

        var barber = new Barber
        {
            UserId = user.Id,
            Bio = createBarberDto.Bio,
        };

        await _userRepository.Create(user);
        await _barberRepository.Create(barber);
    }

    public Task Update(UpdateBarberDto updateBarberDto)
    {
        throw new NotImplementedException();
    }
}