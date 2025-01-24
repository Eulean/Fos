using Fos.Models;
using Fos.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Fos.Controllers;

[ApiController]
[Route("api/[controller]")]
[EnableCors("AllowAll")]
public class UserController : ControllerBase
{
    private readonly IUser _userService;
    
    //Constructor Injection
    public UserController(IUser userService)
    {
        _userService = userService;
    }
    
    [HttpGet]
    public ActionResult<IEnumerable<User>> GetAll()
    {
        var users = _userService.GetAll();
        if (users == null || !users.Any())
        {
            return NotFound("No users found");
        }
        
        return Ok(users);   
        
        // return Ok(_userService.GetAll());
    }
    
    [HttpGet("{id}")]
    public ActionResult<User> GetById(int id)
    {
        var user = _userService.GetById(id);
        if (user == null)
        {
            return NotFound("User not found");
        }
        
        return Ok(user);
    }
    
    [HttpGet("email/{email}")]
    public ActionResult<User> GetByEmail(string email)
    {
        var user = _userService.GetByEmail(email);
        if (user == null)
        {
            return NotFound("User not found");
        }
        
        return Ok(user);
    }
    
    [HttpPost]
    public ActionResult<User> Create(User user)
    {
        var newUser = _userService.Create(user);
        return CreatedAtAction(nameof(GetById), new { id = newUser.Id }, newUser);
    }
    
    [HttpPut]
    public ActionResult<User> Update(User user)
    {
        var updatedUser = _userService.Update(user);
        if (updatedUser == null)
        {
            return NotFound("User not found");
        }
        
        return Ok(updatedUser);
    }
    
    [HttpDelete("{email}")]
    public ActionResult Delete(string email)
    {
        _userService.Delete(email);
        return NoContent();
    }
}