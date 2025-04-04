using Application.Dtos;
using Application.Interfaces;
using Domain.Repositories;

namespace Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IHashingService _hashingService;

    public AuthService(IUserRepository userRepository, IHashingService hashingService)
    {
        _userRepository = userRepository;
        _hashingService = hashingService;
    }

    public async Task<string> Register(AuthDto authDto)
    {
        var existingUser = await _userRepository.FindByEmail(authDto.Email);
        if (existingUser != null) throw new Exception("User already exists.");

        // Hash password
        authDto.Password = _hashingService.Hash(authDto.Password);
        // // Guardar usuario en la bd
        // await _db.Users.AddAsync(user);
        // await _db.SaveChangesAsync();

        Console.WriteLine($"User: {authDto.Name} {authDto.Surname} registered with email: {authDto.Email} and password: {authDto.Password}");

        return "User registered successfully!";
    }

    public async Task<string> Login(string email, string password)
    {
        var user = await _userRepository.FindByEmail(email);
        if (user == null) throw new KeyNotFoundException("User not found.");

        return "Access Token!";
    }

    public async Task<string> RefreshToken()
    {
        await Task.Delay(1000); // Simulate some async work
        return "Token refreshed!";
    }
}