using Application.Dtos;
namespace Application.Interfaces;

public interface IAuthService
{
    Task<string> Register(AuthDto authDto);
    Task<string> Login(string email, string password);
    Task<string> RefreshToken();
}