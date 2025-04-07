using Application.Interfaces;
using Application.Interfaces.Auth;

namespace Infrastructure.Auth;

public class BcryptService : IHashingService
{
    public string Hash(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }

    public bool Verify(string password, string hashedPassword)
    {
        return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
    }
}