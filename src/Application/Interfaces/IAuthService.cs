using Application.Dtos;
using Application.Dtos.Auth;

namespace Application.Interfaces;

public interface IAuthService
{
    Task Register(RegisterDto authDto);
    Task<(TokenInfoDto payload, string token, string refreshToken)> Login(string email, string password);
    Task<(TokenInfoDto payload, string token, string refreshToken)> RefreshToken(string refreshToken);
}