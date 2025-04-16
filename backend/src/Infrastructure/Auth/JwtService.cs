using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Dtos.Auth;
using Application.Interfaces;
using Application.Interfaces.Auth;
using Domain.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Auth;

public class JwtService : IJwtService
{
    private readonly string _tokenSecretKey;
    private readonly string _refreshTokenSecretKey;
    private readonly string _issuer;
    private readonly string _audience;

    public JwtService(IConfiguration config)
    {
        _tokenSecretKey = config["JWT:TokenSecretKey"] 
                          ?? throw new InvalidOperationException("JWT:TokenSecretKey is not configured");
        _refreshTokenSecretKey = config["JWT:RefreshTokenSecretKey"] 
                                 ?? throw new InvalidOperationException("JWT:RefreshTokenSecretKey is not configured");
        _issuer = config["JWT:Issuer"] 
                  ?? throw new InvalidOperationException("JWT:Issuer is not configured");
        _audience = config["JWT:Audience"]
                    ?? throw new InvalidOperationException("JWT:Audience is not configured");
    }
    public string GenerateToken(User user)
    {
        var claims = new []
        {
            new Claim("sub", user.Id.ToString()),
            new Claim("name", user.FullName()),
            new Claim("email", user.Email),
            new Claim("role", user.Role),
        }; 

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_tokenSecretKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            _issuer, 
            _audience,
            claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
    
    public string GenerateRefreshToken(User user)
    {
        var claims = new []
        {
            new Claim("sub", user.Id.ToString()),
            new Claim("name", user.FullName()),
            new Claim("email", user.Email),
            new Claim("role", user.Role),
        }; 

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_refreshTokenSecretKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            _issuer, 
            _audience,
            claims,
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public TokenInfoDto? VerifyRefreshToken(string refreshToken)
    {
       var tokenHandler = new JwtSecurityTokenHandler
       {
           MapInboundClaims = false
       };
       
       var secretKey = Encoding.UTF8.GetBytes(_refreshTokenSecretKey);

       try
       {
           var decoded = tokenHandler.ValidateToken(
               refreshToken, 
               new TokenValidationParameters
           {
              ValidateIssuerSigningKey = true, 
              IssuerSigningKey = new SymmetricSecurityKey(secretKey),
              ValidateIssuer = true,
              ValidIssuer = _issuer,
              ValidateAudience = true,
              ValidAudience = _audience,
              ClockSkew = TimeSpan.Zero,
           }, out var validatedToken);
           
           var tokenInfo = new TokenInfoDto
           {
                Id = Guid.Parse(decoded.Claims.FirstOrDefault(c => c.Type == "sub")?.Value ?? string.Empty),
                Name = decoded.Claims.FirstOrDefault(c => c.Type == "name")?.Value ?? string.Empty,
                Email = decoded.Claims.FirstOrDefault(c => c.Type == "email")?.Value ?? string.Empty,
                Role = decoded.Claims.FirstOrDefault(c => c.Type == "role")?.Value ?? string.Empty
           };
           
           return tokenInfo;
       }
       catch (Exception ex)
       {
           return null;
       }
    }
}