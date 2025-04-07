using Application.Dtos.Auth;
using Domain.Entities;

namespace Application.Interfaces.Auth;

public interface IJwtService
{
    string GenerateToken(User user);
    string GenerateRefreshToken(User user);
    TokenInfoDto? VerifyRefreshToken(string refreshToken);
}