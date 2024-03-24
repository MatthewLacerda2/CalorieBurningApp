using CalorieBurningApp.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Server.Data;

namespace CalorieBurningApp.Server.Data;

[Authorize]
[ApiController]
[Route("api/v1/users")]
[Produces("application/json")]
public class UserController : ControllerBase{

    private readonly ServerContext _context;
    private readonly UserManager<User> _userManager;

    public UserController(ServerContext context, UserManager<User> userManager){
        _context = context;
        _userManager = userManager;
    }

    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<UserDTO>))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(string))]
    [HttpGet("{id}")]
    public async Task<IActionResult> ReadUser(string id) {

        var user = await _context.Users.FindAsync(id);
        if(user==null){
            return NotFound();
        }

        var response = JsonConvert.SerializeObject((UserDTO)user);

        return Ok(response);
    }

    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<UserDTO>))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(string))]
    [HttpGet]
    public async Task<IActionResult> ReadUsers(string? username, string? fullname, int? offset, int limit, string? sort) {

        if (limit < 1) {
            return BadRequest("Limit parameter must be a natural number greater than 0");
        }

        var UsersQuery = _context.Users.AsQueryable();

        if(!string.IsNullOrEmpty(username)){
            UsersQuery = UsersQuery.Where(user => user.UserName!.Contains(username)); //Is this case sensitive???
        }

        if(!string.IsNullOrEmpty(fullname)){
            UsersQuery = UsersQuery.Where(user => user.UserName!.Contains(fullname)); //Is this case sensitive???
        }

        if(!string.IsNullOrEmpty(sort)){
            sort = sort.ToLower();
            switch (sort) {
                case "username":
                    UsersQuery = UsersQuery.OrderBy(c => c.UserName);
                    break;
                case "fullname":
                    UsersQuery = UsersQuery.OrderBy(c => c.UserName);
                    break;
                case "email":
                    UsersQuery = UsersQuery.OrderBy(c => c.Email);
                    break;
                case "phonenumber":
                    UsersQuery = UsersQuery.OrderBy(c => c.PhoneNumber);
                    break;
            }
        }

        if(offset.HasValue){
            UsersQuery = UsersQuery.Skip(offset.Value);
        }
        UsersQuery = UsersQuery.Take(limit);

        var resultQuery = await UsersQuery.ToArrayAsync();
        var resultsArray = resultQuery.Select(c=>(UserDTO)c).ToArray();
        
        if(resultsArray.Length==0){
            return NotFound();
        }
        
        var response = JsonConvert.SerializeObject(resultsArray);

        return Ok(response);
    }

    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserDTO))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(BadRequestObjectResult))]
    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] UserDTO newUser, string password) {

        if(!string.IsNullOrEmpty(newUser.UserName)){

            var existingName = _context.Users.Where(c=>c.UserName == newUser.UserName);
            if(existingName != null){
                return BadRequest("UserName already registered!");
            }

        }else{
            return BadRequest("Empty UserName");
        }

        if(!string.IsNullOrEmpty(newUser.Email)){

            var existingName = _context.Users.Where(c=>c.Email == newUser.Email);
            if(existingName != null){
                return BadRequest("Email already registered!");
            }
            
        }else{
            return BadRequest("Empty Email");
        }

        if(!string.IsNullOrEmpty(newUser.PhoneNumber)){

            var existingName = _context.Users.Where(c=>c.PhoneNumber == newUser.PhoneNumber);
            if(existingName != null){
                return BadRequest("PhoneNumber already registered!");
            }
            
        }

        User user = new User(newUser);

        var result = await _userManager.CreateAsync(user, password);

        if(!result.Succeeded){
            return StatusCode(500, "Internal Server Error: Register User Unsuccessful");
        }

        return CreatedAtAction(nameof(CreateUser), (UserDTO)user);
    }

    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserDTO))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(BadRequestObjectResult))]
    [HttpPatch]
    public async Task<IActionResult> UpdateUser([FromBody] UserDTO upUser) {

        var existingUser = _context.Users.Find(upUser.Id);
        if (existingUser==null) {
            return BadRequest("User does not Exist!");
        }

        existingUser = (User)upUser;

        await _context.SaveChangesAsync();

        var response = JsonConvert.SerializeObject((UserDTO)existingUser);

        return Ok(response);
    }

    [ProducesResponseType(StatusCodes.Status204NoContent, Type = typeof(NoContentResult))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(BadRequestObjectResult))]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(string id) {

        var user = _context.Users.Find(id);
        if(user == null){
            return BadRequest("User does not Exist!");
        }
        
        _context.Users.Remove(user);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}