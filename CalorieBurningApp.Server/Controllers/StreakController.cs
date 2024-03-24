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
[Route("api/v1/streaks")]
[Produces("application/json")]
public class StreakController : ControllerBase{

    private readonly ServerContext _context;

    public StreakController(ServerContext context, UserManager<User> userManager){
        _context = context;
    }

    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Streak>))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(string))]
    [HttpGet("{userId}")]
    public async Task<IActionResult> ReadStreak(string userId) {

        var streak = await _context.Streaks.FirstOrDefaultAsync(s => s.UserId == userId);
        if(streak==null){
            return NotFound();
        }

        var response = JsonConvert.SerializeObject(streak);

        return Ok(response);
    }

    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Streak[]>))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(string))]
    [HttpGet]
    public async Task<IActionResult> ReadUsers(int? min, int? max, int? offset, int limit) {

        if (limit < 1) {
            return BadRequest("Limit parameter must be a natural number greater than 0");
        }

        var StreaksQuery = _context.Streaks.AsQueryable();

        if(min.HasValue){

            if(min < 0){
                return BadRequest("Minimum must be a natural equal or greater than 0");
            }

            StreaksQuery = StreaksQuery.Where( s => s.count >= min);

        }

        if(max.HasValue){
            StreaksQuery = StreaksQuery.Where( s => s.count < max);
        }

        if(offset.HasValue){

            if(offset < 0){
                return BadRequest("Offset parameter must be a natural number equal or greater than 0");
            }

            StreaksQuery = StreaksQuery.Skip(offset.Value);
        }
        StreaksQuery = StreaksQuery.Take(limit);

        var resultQuery = await StreaksQuery.ToArrayAsync();
        var resultsArray = resultQuery.ToArray();
        
        if(resultsArray.Length==0){
            return NotFound();
        }
        
        var response = JsonConvert.SerializeObject(resultsArray);

        return Ok(response);
    }

    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Streak))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(BadRequestObjectResult))]
    [HttpPatch("{userId}")]
    public async Task<IActionResult> IncrementStreak(string userId) {

        var streak = await _context.Streaks.FirstOrDefaultAsync(s => s.UserId == userId);
        if(streak==null){
            return NotFound();
        }

        streak.Increment();

        await _context.SaveChangesAsync();

        var response = JsonConvert.SerializeObject(streak);

        return Ok(response);
    }

    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Streak))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(BadRequestObjectResult))]
    [HttpPatch]
    public async Task<IActionResult> LoseStreak(string userId) {

        var streak = _context.Streaks.FirstOrDefault(s => s.UserId == userId);
        if(streak==null){
            return NotFound();
        }

        streak.Lose();

        await _context.SaveChangesAsync();

        var response = JsonConvert.SerializeObject(streak);

        return Ok(response);
    }
}