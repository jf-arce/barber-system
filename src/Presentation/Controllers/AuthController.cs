using Application.Dtos.Auth;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Application.Validators;
using Application.Validators.Auth;

namespace Presentation.Controllers;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
   private readonly IAuthService _authService;

   public AuthController(IAuthService authService)
   {
        _authService = authService;
   }

   [HttpPost]
   [Route("register")]
   public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
   {
        try {
            var validator = await new RegisterValidator().ValidateAsync(registerDto);
            if (!validator.IsValid) {
                return BadRequest(validator.Errors.Select(e => e.ErrorMessage));
            }
            await _authService.Register(registerDto); 
            return Ok("User registered successfully!");
        }catch (Exception ex) {
            return BadRequest(ex.Message);
        }
   }
   
   [HttpPost]
   [Route("login")]
   public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
   {
        try
        {
            var validator = await new LoginValidator().ValidateAsync(loginDto);
            if (!validator.IsValid) return BadRequest("Invalid credentials");
            
            var jwtToken = await _authService.Login(loginDto.Email, loginDto.Password);
            
            Response.Cookies.Append("access_token", jwtToken.token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddHours(1)
            });
            
            Response.Cookies.Append("refresh_token", jwtToken.refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddDays(30)
            });
            
            return Ok(jwtToken.payload);
        }catch (Exception ex) {
            return BadRequest(ex.Message);
        }
   }
   
    [HttpPost]
    [Route("refreshToken")]
    public async Task<IActionResult> RefreshToken()
    {
        var refreshToken = Request.Cookies["refresh_token"];
        if (string.IsNullOrEmpty(refreshToken))
        {
            return Unauthorized("Refresh token is missing.");
        }
        
        try
        {
            var newJwtToken = await _authService.RefreshToken(refreshToken);
            
            Response.Cookies.Append("access_token", newJwtToken.token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddHours(1)
            });
            
            Response.Cookies.Append("refresh_token", newJwtToken.refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddDays(30)
            });
            
            return Ok(newJwtToken.payload);
        }catch (Exception ex) {
            return BadRequest(ex.Message);
        }
    }
    

}