using Application.Dtos;
using Application.Dtos.Auth;

namespace Application.Interfaces;

public interface IAuthService
{
    Task Register(RegisterDto authDto);
    Task<(JwtPayload payload, string token)> Login(string email, string password);
    Task<string> RefreshToken();
}