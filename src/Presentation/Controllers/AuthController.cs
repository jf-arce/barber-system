using Application.Dtos;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Application.Validators;

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
   public async Task<IActionResult> Register([FromBody] AuthDto authDto)
   {
        var validator = new AuthValidator().Validate(authDto);
        if (!validator.IsValid) {
            return BadRequest(validator.Errors.Select(e => e.ErrorMessage));
        }

        try {
            var token = await _authService.Register(authDto); 
            return Ok("User registered successfully!");
        }catch (Exception ex) {
            return BadRequest(ex.Message);
        }
   }

}