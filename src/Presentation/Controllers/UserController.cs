using Application.Dtos.User;
using Domain.Entities;
using Application.Interfaces;
using Mapster;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }
        
        [HttpGet]
        public async Task<IActionResult> FindAll(){
            var users = await _userService.FindAll();
            var usersDto = users.Adapt<List<GetUserDto>>();
            return Ok(usersDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> FindOne(string id){
            var user = await _userService.FindOne(Guid.Parse(id));
            var userDto = user.Adapt<GetUserDto>();
            return Ok(userDto);
        }
    }
}
