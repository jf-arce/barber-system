using Application.Dtos;
using Application.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Application.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _db;
    private readonly IUserService _userService;

    public AuthService(AppDbContext db, IUserService userService)
    {
        _db = db;
        _userService = userService;
    }

    public async Task<string> Register(AuthDto authDto)
    {
        var existingUser = await _db.Users.FirstOrDefaultAsync(u => u.Email == authDto.Email);
        if (existingUser != null) throw new Exception("User already exists.");

        // Hash password
        authDto.Password = BCrypt.Net.BCrypt.HashPassword(authDto.Password);
        // // Guardar usuario en la bd
        // await _db.Users.AddAsync(user);
        // await _db.SaveChangesAsync();

        Console.WriteLine($"User: {authDto.Name} {authDto.Surname} registered with email: {authDto.Email} and password: {authDto.Password}");

        return "User registered successfully!";
    }

    public async Task<string> Login(string email, string password)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null) throw new KeyNotFoundException("User not found.");

        return "Access Token!";
    }

    public async Task<string> RefreshToken()
    {
        await Task.Delay(1000); // Simulate some async work
        return "Token refreshed!";
    }
}