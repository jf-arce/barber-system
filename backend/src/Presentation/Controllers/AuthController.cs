using System.Net;
using Application.Dtos.Auth;
using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.Auth;
using Microsoft.AspNetCore.Mvc;
using Application.Validators;
using Application.Validators.Auth;

namespace Presentation.Controllers;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
   private readonly IAuthService _authService;
   private readonly IWebHostEnvironment _env;

   public AuthController(IAuthService authService, IWebHostEnvironment env)
   {
        _authService = authService;
        _env = env;
   }

   [HttpPost]
   [Route("register")]
   public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
   {
        try {
            var validator = await new RegisterValidator().ValidateAsync(registerDto);
            if (!validator.IsValid)
            {
                return BadRequest(validator.Errors.Select(e => e.ErrorMessage));
            }
            
            await _authService.Register(registerDto); 
            return Ok(new { message = "User registered successfully!" });
        }catch (Exception ex) {
            var handleException = HandleException.Handle(ex);
            return StatusCode(handleException.StatusCode, handleException.Body);
        }
   }
   
   [HttpPost]
   [Route("login")]
   public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
   {
        try
        {
            var validator = await new LoginValidator().ValidateAsync(loginDto);
            if (!validator.IsValid)
            {
                throw new CustomHttpException(HttpStatusCode.BadRequest, "Invalid credentials");
            }
            
            var jwtToken = await _authService.Login(loginDto);
            
            Response.Cookies.Append("access_token", jwtToken.token, new CookieOptions
            {
                HttpOnly = true,
                Secure = false, // Set to true in production with HTTPS
                SameSite = SameSiteMode.Lax, //Set None if you want cross-site cookies
                Expires = DateTimeOffset.UtcNow.AddHours(1)
            });
            
            Response.Cookies.Append("refresh_token", jwtToken.refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = false, // Set to true in production with HTTPS
                SameSite = SameSiteMode.Lax, //Set None if you want cross-site cookies
                Expires = DateTimeOffset.UtcNow.AddDays(7)
            });
            
            return Ok(jwtToken.payload);
        }catch (Exception ex)
        {
            var handleException = HandleException.Handle(ex);
            return StatusCode(handleException.StatusCode, handleException.Body);
        }
   }
    
   [HttpPost]
   [Route("logout")]
   public IActionResult Logout()
   {
       try
       {
           Response.Cookies.Delete("access_token");
           Response.Cookies.Delete("refresh_token");
           return Ok(new { message = "Logged out successfully." });
       }
       catch (Exception ex)
       {
           var handleException = HandleException.Handle(ex);
           return StatusCode(handleException.StatusCode, handleException.Body);
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
                Secure = false, // Set to true in production with HTTPS
                SameSite = SameSiteMode.Lax, //Set None if you want cross-site cookies
                Expires = DateTimeOffset.UtcNow.AddHours(7)
            });
            
            Response.Cookies.Append("refresh_token", newJwtToken.refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = false, // Set to true in production with HTTPS
                SameSite = SameSiteMode.Lax, //Set None if you want cross-site cookies
                Expires = DateTimeOffset.UtcNow.AddDays(30)
            });
            
            return Ok(newJwtToken.payload);
        }catch (Exception ex) {
            var handleException = HandleException.Handle(ex);
            return StatusCode(handleException.StatusCode, handleException.Body);
        }
    }
}