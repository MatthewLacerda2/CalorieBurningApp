using CalorieBurningApp.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;

namespace CalorieBurningApp.Server.Controllers;

[ApiController]
[Route("api/v1/leaderboard")]
[Produces("application/json")]
public class LeaderboardController : ControllerBase
{

    private readonly ServerContext _context;

    public LeaderboardController(ServerContext context)
    {
        _context = context;
    }

    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<UserDTO[]>))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(string))]
    [HttpGet]
    public async Task<IActionResult> ReadUsersCaloriesRanks(int offset, int limit)
    {
        if (offset < 0)
        {
            return BadRequest("Offset parameter must be a natural number greater than 0");
        }

        if (limit < 1)
        {
            return BadRequest("Limit parameter must be a natural number greater than 0");
        }

        var UsersQuery = _context.Users.AsQueryable();

        // Sort the query by 'burnedCalories' in descending order
        UsersQuery = UsersQuery.OrderByDescending(u => u.burnedCalories);

        // Apply pagination
        UsersQuery = UsersQuery.Skip(offset).Take(limit);

        var resultQuery = await UsersQuery.ToArrayAsync();
        var resultsArray = resultQuery.Select(c => (UserDTO)c).ToArray();

        if (resultsArray.Length == 0)
        {
            return NotFound("You skipped too many");    //Or your Database has no Users...
        }

        return Ok(resultsArray);
    }

}