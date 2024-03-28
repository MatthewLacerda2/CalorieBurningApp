using CalorieBurningApp.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Server.Data;

namespace CalorieBurningApp.Server.Controllers;

[ApiController]
[Route("api/v1/users")]
[Produces("application/json")]
public class UserController : ControllerBase
{

    private readonly ServerContext _context;
    private readonly UserManager<User> _userManager;

    public UserController(ServerContext context, UserManager<User> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<UserDTO>))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(string))]
    [HttpGet("{id}")]
    public async Task<IActionResult> ReadUser(string id)
    {

        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        var response = JsonConvert.SerializeObject((UserDTO)user);

        return Ok(response);
    }

    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<UserDTO[]>))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(string))]
    [HttpGet]
    public async Task<IActionResult> ReadUsers(string? username, string? fullname, int? offset, int limit, string? sort)
    {

        if (limit < 1)
        {
            return BadRequest("Limit parameter must be a natural number greater than 0");
        }

        var UsersQuery = _context.Users.AsQueryable();

        if (!string.IsNullOrEmpty(username))
        {
            UsersQuery = UsersQuery.Where(user => user.UserName!.Contains(username)); //Is this case sensitive???
        }

        if (!string.IsNullOrEmpty(fullname))
        {
            UsersQuery = UsersQuery.Where(user => user.UserName!.Contains(fullname)); //Is this case sensitive???
        }

        if (!string.IsNullOrEmpty(sort))
        {
            sort = sort.ToLower();
            switch (sort)
            {
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

        if (offset.HasValue)
        {
            UsersQuery = UsersQuery.Skip(offset.Value);
        }
        UsersQuery = UsersQuery.Take(limit);

        var resultQuery = await UsersQuery.ToArrayAsync();
        var resultsArray = resultQuery.Select(c => (UserDTO)c).ToArray();

        if (resultsArray.Length == 0)
        {
            return NotFound();
        }

        return Ok(resultsArray);
    }

    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserDTO))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(BadRequestObjectResult))]
    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] UserDTO newUser, string password)
    {

        if (string.IsNullOrEmpty(newUser.UserName))
        {
            return BadRequest("Empty UserName");
        }
        else if (_context.Users.Any(c => c.UserName == newUser.UserName))
        {
            return BadRequest("UserName already registered!");
        }

        if (string.IsNullOrEmpty(newUser.Email))
        {
            return BadRequest("Empty Email");
        }
        else if (_context.Users.Any(c => c.Email == newUser.Email))
        {
            return BadRequest("Email already registered!");
        }

        if (!string.IsNullOrEmpty(newUser.PhoneNumber) && _context.Users.Any(c => c.PhoneNumber == newUser.PhoneNumber))
        {
            return BadRequest("PhoneNumber already registered!");
        }

        if (!StringChecker.IsPasswordStrong(password))
        {
            return BadRequest("Password must have an Upper-Case, a Lower-Case, a number and a special character");
        }

        newUser.createdDate = DateTime.Now;
        newUser.lastLogin = DateTime.Now;
        newUser.burnedCalories = 0;

        User user = new User(newUser.FullName, newUser.birthday, newUser.UserName, newUser.Email, newUser.PhoneNumber);
        var result = await _userManager.CreateAsync(user, password);

        if (string.IsNullOrEmpty(user.FullName))
        {
            user.FullName = "";
        }

        Streak streak = new Streak(user.Id, user.UserName!, user.FullName);
        _context.Streaks.Add(streak);

        await _context.SaveChangesAsync();

        if (!result.Succeeded)
        {
            return StatusCode(500, "Internal Server Error: Registrar Usuario Unsuccessful\n\n" + result.Errors);
        }

        return CreatedAtAction(nameof(CreateUser), (UserDTO)user);
    }

    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserDTO))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(BadRequestObjectResult))]
    [Authorize]
    [HttpPatch]
    public async Task<IActionResult> UpdateUser([FromBody] UserDTO upUser)
    {

        var existingUser = _context.Users.Find(upUser.Id);
        if (existingUser == null)
        {
            return BadRequest("User does not Exist!");
        }

        if (existingUser.UserName != upUser.UserName && _context.Users.Any(c => c.Email == upUser.UserName))
        {
            return BadRequest("UserName already registered!");
        }

        if (!string.IsNullOrEmpty(upUser.Email) && existingUser.Email != upUser.Email && _context.Users.Any(c => c.Email == upUser.Email))
        {
            return BadRequest("Email already registered!");
        }

        if (!string.IsNullOrEmpty(upUser.PhoneNumber))
        {
            if (!StringChecker.HasNoLettersOrSpaces(upUser.PhoneNumber))
            {
                return BadRequest("PhoneNumber had a letter or space!");
            }
            else if (existingUser.PhoneNumber != upUser.PhoneNumber && _context.Users.Any(c => c.PhoneNumber == upUser.PhoneNumber))
            {
                return BadRequest("PhoneNumber already registered!");
            }
        }

        existingUser.FullName = upUser.FullName;
        existingUser.UserName = upUser.UserName;
        existingUser.Email = upUser.Email;
        existingUser.PhoneNumber = upUser.PhoneNumber;

        var userStreak = _context.Streaks.FirstOrDefault(s => s.UserId == existingUser.Id);
        userStreak!.FullName = upUser.FullName;
        userStreak.UserName = upUser.UserName;

        await _context.SaveChangesAsync();

        var response = JsonConvert.SerializeObject(upUser);

        return Ok(response);
    }

    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(BadRequestObjectResult))]
    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(string id)
    {

        var user = await _userManager.FindByIdAsync(id);
        if (user == null)
        {
            return BadRequest("User does not exist!");
        }

        var result = await _userManager.DeleteAsync(user);

        if (result.Succeeded)
        {
            return NoContent();
        }
        else
        {
            return StatusCode(500, "Internal Server Error: Delete User operation unsuccessful\n\n" + string.Join(",", result.Errors.Select(e => e.Description)));
        }
    }
}