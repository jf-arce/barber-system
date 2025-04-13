using Application.Dtos.Auth;

namespace Application.Interfaces.Auth;

public interface IAuthService
{
    Task Register(RegisterDto authDto);
    Task<(TokenInfoDto payload, string token, string refreshToken)> Login(LoginDto loginDto);
    Task<(TokenInfoDto payload, string token, string refreshToken)> RefreshToken(string refreshToken);
}