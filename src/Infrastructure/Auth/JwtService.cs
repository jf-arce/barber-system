using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Dtos.Auth;
using Application.Interfaces;
using Domain.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Auth;

public class JwtService : IJwtService
{
    private readonly IConfiguration _configuration;
    
    private readonly string tokenSecretKey = "EstaEsUnaClaveSuperSegura1234567890!!!";
    private readonly string refreshTokenSecretKey = "EstaEsUnaClaveBastanteSegura1234567890!!!";
    private readonly string issuer = "Barber API";
    private readonly string audience = "Barber clients";
    private readonly DateTime expires = DateTime.UtcNow.AddHours(1);

    public string GenerateToken(User user)
    {
        // var tokenSecretKey = _configuration["Jwt:SecretKey"] ?? throw new ArgumentNullException("SecretKey not found in configuration.");
        // var issuer = _configuration["Jwt:Issuer"];
        // var audience = _configuration["Jwt:Audience"];
        // const string tokenSecretKey = "EstaEsUnaClaveSuperSegura1234567890!!!";
        // const string issuer = "Barber API";
        // const string audience = "Barber clients";
        // var expires = DateTime.UtcNow.AddHours(1); // 1 hour

        var claims = new []
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Name, user.FullName()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role),
        }; 

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenSecretKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer, 
            audience,
            claims,
            expires: expires,
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
    
    public string GenerateRefreshToken(User user)
    {
        var claims = new []
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Name, user.FullName()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role),
        }; 

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(refreshTokenSecretKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer, 
            audience,
            claims,
            expires: expires,
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public TokenInfoDto? VerifyRefreshToken(string refreshToken)
    {
       var tokenHandler = new JwtSecurityTokenHandler();
       var secretKey = Encoding.UTF8.GetBytes(refreshTokenSecretKey);

       try
       {
           var decoded = tokenHandler.ValidateToken(refreshToken, new TokenValidationParameters
           {
              ValidateIssuerSigningKey = true, 
              IssuerSigningKey = new SymmetricSecurityKey(secretKey),
              ValidateIssuer = true,
              ValidIssuer = issuer,
              ValidateAudience = true,
              ValidAudience = audience,
              ClockSkew = TimeSpan.Zero
           }, out SecurityToken validatedToken);

           return new TokenInfoDto
           {
              Id = Guid.Parse(decoded.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value),
              Name = decoded.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Name)?.Value,
              Email = decoded.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Email)?.Value,
              Role = decoded.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value
           };
       }
       catch
       {
           return null;
       }
    }
}