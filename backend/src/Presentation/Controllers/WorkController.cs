using Application.Dtos.Works;
using Application.Exceptions;
using Application.Interfaces;
using Domain.Enums.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers;

[Authorize($"{nameof(UserRolesEnum.Admin)}, {nameof(UserRolesEnum.Barber)}")]
[Route("api/works")]
[ApiController]
public class WorkController : ControllerBase
{
   private readonly IWorkService _workService;
   
   public WorkController(IWorkService workService)
   {
      _workService = workService;
   }
   
   [HttpPost]
   public async Task<IActionResult> Create([FromBody] CreateWorkDto createWorkDto)
   {
      try
      {
         await _workService.Create(createWorkDto);
         return Ok("Work created successfully");
      }
      catch (Exception ex)
      {
         var handleException = HandleException.Handle(ex);
         return StatusCode(handleException.StatusCode, handleException.Body);
      }
   }
   
   [HttpGet]
   public async Task<IActionResult> FindAll()
   {
      try
      {
         var works = await _workService.FindAll();
         return Ok(works);
      }
      catch (Exception ex)
      {
         var handleException = HandleException.Handle(ex);
         return StatusCode(handleException.StatusCode, handleException.Body);
      }
   }
}