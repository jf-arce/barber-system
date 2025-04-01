using Application.Dtos.User;
using Domain.Entities;
using Domain.Interfaces;
using Mapster;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUser _userService;

        public UsersController(IUser userService)
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

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] GetUserDto userDto){
            var user = userDto.Adapt<User>();
            await _userService.Create(user);
            return CreatedAtAction(nameof(FindOne), new { id = user.Id }, userDto);
        }
    }
}
