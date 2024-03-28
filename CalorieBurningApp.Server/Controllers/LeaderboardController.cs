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
    [Route("calories")]
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

        UsersQuery = UsersQuery.OrderByDescending(u => u.burnedCalories);

        UsersQuery = UsersQuery.Skip(offset).Take(limit);

        var resultQuery = await UsersQuery.ToArrayAsync();
        var resultsArray = resultQuery.Select(c => (UserDTO)c).ToArray();

        return Ok(resultsArray);
    }

    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Streak[]>))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(string))]
    [HttpGet]
    [Route("streaks")]
    public async Task<IActionResult> ReadStreaksRanks(string sort, int offset, int limit)
    {
        if (offset < 0)
        {
            return BadRequest("Offset parameter must be a natural number greater than 0");
        }

        if (limit < 1)
        {
            return BadRequest("Limit parameter must be a natural number greater than 0");
        }

        var StreaksQuery = _context.Streaks.AsQueryable();

        sort = sort.ToLower();
        if (sort == "record")
        {
            StreaksQuery = StreaksQuery.OrderByDescending(u => u.record).ThenByDescending(u => u.count);
        }
        else
        {
            StreaksQuery = StreaksQuery.OrderByDescending(u => u.count).ThenByDescending(u => u.record);

        }

        StreaksQuery = StreaksQuery.Skip(offset).Take(limit);

        var resultQuery = await StreaksQuery.ToArrayAsync();
        var resultsArray = resultQuery.Select(c => c).ToArray();

        return Ok(resultsArray);
    }

}