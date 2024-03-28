using CalorieBurningApp.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Server.Data;

namespace CalorieBurningApp.Server.Controllers;

[Authorize]
[ApiController]
[Route("api/v1/leaderboard")]
[Produces("application/json")]
public class LeaderboardController : ControllerBase{

    private readonly ServerContext _context;
    private readonly UserManager<User> _userManager;

    public LeaderboardController(ServerContext context, UserManager<User> userManager){
        _context = context;
        _userManager = userManager;
    }

    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ExerciseEntry>))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(string))]
    [HttpGet("{id}")]
    public async Task<IActionResult> ReadByUserId(string userId) {

        var user = await _context.Users.FindAsync(userId);
        if(user==null){
            return NotFound();
        }

        var response = JsonConvert.SerializeObject((UserDTO)user);

        return Ok(response);
    }

    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<UserDTO[]>))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(string))]
    [HttpGet]
    public async Task<IActionResult> ReadByUsersRanks(int offset, int limit) {

        if (offset < 0){
            return BadRequest("Offset parameter must be a natural number greater than 0");
        }

        if (limit < 1) {
            return BadRequest("Limit parameter must be a natural number greater than 0");
        }

        var UsersQuery = _context.Users.AsQueryable();

        UsersQuery.OrderBy(u=>u.burnedCalories);

        UsersQuery = UsersQuery.Skip(offset);
        UsersQuery = UsersQuery.Take(limit);

        var resultQuery = await UsersQuery.ToArrayAsync();
        var resultsArray = resultQuery.Select(c=>(UserDTO)c).ToArray();
        
        if(resultsArray.Length==0){
            return NotFound("You skipped too many");
        }
        
        var response = JsonConvert.SerializeObject(resultsArray);

        return Ok(response);
    }
}