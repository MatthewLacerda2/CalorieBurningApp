using CalorieBurningApp.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Server.Data;

namespace CalorieBurningApp.Server.Controllers;

[ApiController]
[Route("api/v1/leaderboard")]
[Produces("application/json")]
public class LeaderboardController : ControllerBase
{

    private readonly ServerContext _context;
    private readonly UserManager<User> _userManager;

    public LeaderboardController(ServerContext context, UserManager<User> userManager)
    {
        _context = context;
        _userManager = userManager;
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

        UsersQuery.OrderBy(u => u.burnedCalories);

        UsersQuery = UsersQuery.Skip(offset);
        UsersQuery = UsersQuery.Take(limit);

        var resultQuery = await UsersQuery.ToArrayAsync();
        var resultsArray = resultQuery.Select(c => (UserDTO)c).ToArray();

        if (resultsArray.Length == 0)
        {
            return NotFound("You skipped too many");
        }

        var response = JsonConvert.SerializeObject(resultsArray);

        return Ok(response);
    }

    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Streak[]>))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(string))]
    [HttpGet]
    public async Task<IActionResult> ReadStreakCountRanks(int offset, int limit)
    {

        if (offset < 0)
        {
            return BadRequest("Offset parameter must be a natural number greater than 0");
        }

        if (limit < 1)
        {
            return BadRequest("Limit parameter must be a natural number greater than 0");
        }

        var UsersQuery = _context.Streaks.AsQueryable();

        UsersQuery.OrderBy(u => u.count);

        UsersQuery = UsersQuery.Skip(offset);
        UsersQuery = UsersQuery.Take(limit);

        var resultQuery = await UsersQuery.ToArrayAsync();
        var resultsArray = resultQuery.Select(c => c).ToArray();

        if (resultsArray.Length == 0)
        {
            return NotFound("You skipped too many");
        }

        var response = JsonConvert.SerializeObject(resultsArray);

        return Ok(response);
    }

    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Streak[]>))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(string))]
    [HttpGet]
    public async Task<IActionResult> ReadStreakRecordRanks(int offset, int limit)
    {

        if (offset < 0)
        {
            return BadRequest("Offset parameter must be a natural number greater than 0");
        }

        if (limit < 1)
        {
            return BadRequest("Limit parameter must be a natural number greater than 0");
        }

        var UsersQuery = _context.Streaks.AsQueryable();

        UsersQuery.OrderBy(u => u.record);

        UsersQuery = UsersQuery.Skip(offset);
        UsersQuery = UsersQuery.Take(limit);

        var resultQuery = await UsersQuery.ToArrayAsync();
        var resultsArray = resultQuery.Select(c => c).ToArray();

        if (resultsArray.Length == 0)
        {
            return NotFound("You skipped too many");
        }

        var response = JsonConvert.SerializeObject(resultsArray);

        return Ok(response);
    }
}