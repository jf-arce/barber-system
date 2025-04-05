using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Interfaces;
using Domain.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Auth;

public class JwtService : IJwtService
{
    private readonly IConfiguration _configuration;

    public string GenerateToken(User user)
    {
        // var secretKey = _configuration["Jwt:SecretKey"] ?? throw new ArgumentNullException("SecretKey not found in configuration.");
        // var issuer = _configuration["Jwt:Issuer"];
        // var audience = _configuration["Jwt:Audience"];
        var secretKey = "EstaEsUnaClaveSuperSegura1234567890!!!";
        var issuer = "Barber API";
        var audience = "Barber clients";
        var expires = DateTime.UtcNow.AddHours(1); // 1 hour

        var claims = new []
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Name, user.FullName()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role),
        }; 

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer, 
            audience,
            claims,
            expires: expires,
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public string GenerateRefreshToken()
    {
        throw new NotImplementedException();
    }

    public bool ValidateToken(string token)
    {
        throw new NotImplementedException();
    }
}