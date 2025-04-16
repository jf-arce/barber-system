using Application.Dtos.Users;
using Application.Exceptions;
using Domain.Entities;
using Application.Interfaces;
using Domain.Enums.User;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers
{
    [Authorize]
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }
        
        [Authorize(Roles = nameof(UserRolesEnum.Admin))]
        [HttpGet]
        public async Task<IActionResult> FindAll(){
            try
            {
                var users = await _userService.FindAll();
                var usersDto = users.Adapt<List<GetUserDto>>();
                return Ok(usersDto);
            }
            catch (Exception ex)
            {
                var handleException = HandleException.Handle(ex);
                return StatusCode(handleException.StatusCode, handleException.Body);
            }
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> FindOne(Guid id){
            try
            {
                var user = await _userService.FindOne(id);
                var userDto = user.Adapt<GetUserDto>();
                return Ok(userDto);
            }
            catch (Exception ex)
            {
                var handleException = HandleException.Handle(ex);
                return StatusCode(handleException.StatusCode, handleException.Body);
            }
        }
        
        [HttpGet("email/{email}")]
        public async Task<IActionResult> FindByEmail(string email){
            try
            {
                var user = await _userService.FindByEmail(email);
                var userDto = user.Adapt<GetUserDto>();
                return Ok(userDto);
            }
            catch (Exception ex)
            {
                var handleException = HandleException.Handle(ex);
                return StatusCode(handleException.StatusCode, handleException.Body);
            }
        }
        
        [HttpPatch("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateUserDto updateUserDto){
            try
            {
                await _userService.Update(id, updateUserDto);
                return Ok("User updated successfully");
            }
            catch (Exception ex)
            {
                var handleException = HandleException.Handle(ex);
                return StatusCode(handleException.StatusCode, handleException.Body);
            }
        }
        
        [Authorize(Roles = nameof(UserRolesEnum.Admin))]
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                await _userService.Delete(id);
                return Ok("User deleted successfully");
            }
            catch (Exception ex)
            {
                var handleException = HandleException.Handle(ex);
                return StatusCode(handleException.StatusCode, handleException.Body);
            }
        }
    }
}
