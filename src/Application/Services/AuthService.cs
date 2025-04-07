using Application.Dtos.Auth;
using Application.Interfaces.Auth;
using Domain.Entities;
using Domain.Enums;
using Domain.Enums.User;
using Domain.Repositories;

namespace Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IHashingService _hashingService;
    private readonly IJwtService _jwtService;

    public AuthService(IUserRepository userRepository, IHashingService hashingService, IJwtService jwtService)
    {
        _userRepository = userRepository;
        _hashingService = hashingService;
        _jwtService = jwtService;
    }

    public async Task Register(RegisterDto registerDto)
    {
        var existingUser = await _userRepository.FindByEmail(registerDto.Email);
        if (existingUser != null) throw new Exception("User already exists.");

        registerDto.Password = _hashingService.Hash(registerDto.Password);
        
        var newUser = new User
        {
            Name = registerDto.Name,
            Surname = registerDto.Surname,
            Email = registerDto.Email,
            Password = registerDto.Password,
            Gender = registerDto.Gender,
            Phone = registerDto.Phone ?? null,
            BirthDate = registerDto.BirthDate,
            Role = UserRolesEnum.User.ToString(),
        };

        await _userRepository.Create(newUser);
    } 
    
    public async Task<(TokenInfoDto payload, string token, string refreshToken)> Login(string email, string password)
    {
        var user = await _userRepository.FindByEmail(email);
        if (user == null) throw new KeyNotFoundException("User not found.");

        var isPasswordValid = _hashingService.Verify(password, user.Password);
        if (!isPasswordValid) throw new Exception("Invalid password.");
        
        var token = _jwtService.GenerateToken(user);
        var refreshToken = _jwtService.GenerateRefreshToken(user);
        
        var payload = new TokenInfoDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            Role = user.Role
        };

        return (payload, token, refreshToken);
    }

    public async Task<(TokenInfoDto payload, string token, string refreshToken)> RefreshToken(string refreshToken)
    {
        var tokenInfo = _jwtService.VerifyRefreshToken(refreshToken);
        if (tokenInfo == null) throw new UnauthorizedAccessException("Invalid refresh token.");

        var user = await _userRepository.FindByEmail(tokenInfo.Email);
        if (user == null) throw new KeyNotFoundException("User not found.");

        var token = _jwtService.GenerateToken(user);
        
        var payload = new TokenInfoDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            Role = user.Role
        };
        
        return (payload, token, refreshToken);
    }
}