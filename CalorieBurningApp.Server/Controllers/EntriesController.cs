using CalorieBurningApp.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Server.Data;

namespace CalorieBurningApp.Server.Controllers;

[ApiController]
[Route("api/v1/entries")]
[Produces("application/json")]
public class EntriesController : ControllerBase{

    private readonly ServerContext _context;
    private readonly UserManager<User> _userManager;

    public EntriesController(ServerContext context, UserManager<User> userManager){
        _context = context;
        _userManager = userManager;
    }

    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ExerciseEntry>))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(string))]
    [HttpGet("{id}")]
    public async Task<IActionResult> ReadEntry(Guid id) {

        var entry = await _context.ExerciseEntries.FindAsync(id);
        if(entry==null){
            return NotFound();
        }
        
        var response = JsonConvert.SerializeObject(entry);

        return Ok(response);
    }

    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ExerciseEntry[]>))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(string))]
    [HttpGet]
    public async Task<IActionResult> ReadEntries([FromBody] EExercise[]? exercises, DateTime? datetimeMin, DateTime? datetimeMax,
                                                string? userId, string? title, int? burnedCaloriesMin, int? burnedCaloriesMax,
                                                int? offset, int limit, string? sort) {

        if (limit < 1) {
            return BadRequest("Limit parameter must be a natural number greater than 0");
        }

        var EntriesQuery = _context.ExerciseEntries.AsQueryable();

        if (exercises != null && exercises.Length > 0) {
            exercises = exercises.Distinct().ToArray();
            EntriesQuery = EntriesQuery.Where(e => exercises.Contains(e.exercise));
        }

        if (datetimeMin.HasValue) {

            if(datetimeMin > DateTime.Now){
                return BadRequest("How come your minimum date-time hasn't passed yet?!");
            }

            EntriesQuery = EntriesQuery.Where(e => e.dateTime >= datetimeMin);
        }

        if (datetimeMax.HasValue) {
            EntriesQuery = EntriesQuery.Where(e => e.dateTime <= datetimeMax);
        }

        if(!string.IsNullOrEmpty(userId)){
            EntriesQuery = EntriesQuery.OrderBy( e=>e.userId == userId);
        }

        if(!string.IsNullOrEmpty(title)){
            EntriesQuery = EntriesQuery.OrderBy( e=>e.title.Contains(title));
        }

        if(burnedCaloriesMin.HasValue){
            if(burnedCaloriesMin < 0){
                return BadRequest("BurnedCaloriesMin must be a natural number equal or greater than 0");
            }
            EntriesQuery = EntriesQuery.Where(e=>e.burnedCalories >= burnedCaloriesMin);
        }

        if(burnedCaloriesMax.HasValue){
            if(burnedCaloriesMax <= 0){
                return BadRequest("BurnedCaloriesMax must be a natural number equal or greater than 0");
            }
            EntriesQuery = EntriesQuery.Where(e=>e.burnedCalories <= burnedCaloriesMax);
        }

        if(offset.HasValue){
            if(offset < 0){
                return BadRequest("Offset parameter must be a natural number equal or greater than 0");
            }
            EntriesQuery = EntriesQuery.Skip(offset.Value);
        }

        if(!string.IsNullOrEmpty(sort)){
            sort = sort.ToLower();
            switch (sort) {
                case "exercise":
                    EntriesQuery = EntriesQuery.OrderBy(c => c.exercise);
                    break;
                case "datetime":
                    EntriesQuery = EntriesQuery.OrderBy(c => c.dateTime);
                    break;
                case "title":
                    EntriesQuery = EntriesQuery.OrderBy(c => c.title);
                    break;
                case "burnedcalories":
                    EntriesQuery = EntriesQuery.OrderBy(c => c.burnedCalories);
                    break;
            }
        }

        if(offset.HasValue){
            EntriesQuery = EntriesQuery.Skip(offset.Value);
        }
        EntriesQuery = EntriesQuery.Take(limit);

        var resultQuery = await EntriesQuery.ToArrayAsync();
        var resultsArray = resultQuery.ToArray();
        
        if(resultsArray.Length==0){
            return NotFound();
        }
        
        var response = JsonConvert.SerializeObject(resultsArray);

        return Ok(response);
    }

    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ExerciseEntry))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(BadRequestObjectResult))]
    [HttpPost]
    public async Task<IActionResult> CreateEntry([FromBody] ExerciseEntry newEntry) {

        var userExists = await _userManager.FindByIdAsync(newEntry.userId);
        if (userExists==null){
            return BadRequest("User does not exist!");
        }
        Console.WriteLine("CHEGOOOOOOU");

        if(newEntry.dateTime > DateTime.Now){
            return BadRequest("Your Date-and-Time has not even passed yet!");
        }

        if(newEntry.burnedCalories <= 0){
            return BadRequest("Calories must be a natural number greater than 0");
        }

        _context.ExerciseEntries.Add(newEntry);
        await _context.SaveChangesAsync();

        Console.WriteLine("Entry saved successfully");

        // Perform the streak check after saving the entry
        await CheckAndUpdateStreak(newEntry);

        var response = JsonConvert.SerializeObject(newEntry);

        return CreatedAtAction(nameof(CreateEntry), newEntry);
    }

    private async Task CheckAndUpdateStreak(ExerciseEntry newEntry){

        // Retrieve the last entry asynchronously
        var lastEntry = await _context.ExerciseEntries
            .Where(e => e.userId == newEntry.userId)
            .OrderByDescending(e => e.dateTime)
            .FirstOrDefaultAsync();

        // If there is no last entry or it was not posted yesterday, return
        if (lastEntry == null || lastEntry.dateTime.Date != DateTime.Now.AddDays(-1).Date){
            return;
        }

        // Otherwise, update the streak
        var streak = await _context.Streaks.FirstOrDefaultAsync(s => s.UserId == newEntry.userId);
        if (streak != null){
            streak.Increment();
            await _context.SaveChangesAsync();
            Console.WriteLine("Streak updated successfully");
        }
    }

    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ExerciseEntry))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(BadRequestObjectResult))]
    [HttpPatch]
    public async Task<IActionResult> UpdateEntry([FromBody] ExerciseEntry upEntry) {

        var entryExists = _context.ExerciseEntries.Find(upEntry.Id);
        if (entryExists==null) {
            return BadRequest("Entry does not Exist!");
        }

        if(upEntry.dateTime > DateTime.Now){
            return BadRequest("Your Date-and-Time has not even paased yet!");
        }

        if(upEntry.burnedCalories <= 0){
            return BadRequest("Calories must be a natural number greater than 0");
        }

        int caloryUpdate = upEntry.burnedCalories - entryExists.burnedCalories;
        _context.Users.Find(upEntry.Id)!.burnedCalories += caloryUpdate;

        entryExists = upEntry;
        await _context.SaveChangesAsync();

        var response = JsonConvert.SerializeObject(entryExists);

        return Ok(response);
    }

    [ProducesResponseType(StatusCodes.Status204NoContent, Type = typeof(NoContentResult))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(BadRequestObjectResult))]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEntry(Guid id) {

        var entry = _context.ExerciseEntries.Find(id);
        if(entry == null){
            return BadRequest("Entry does not Exist!");
        }

        _context.ExerciseEntries.Remove(entry);
        _context.Users.Find(entry.Id)!.burnedCalories -= entry.burnedCalories;

        await _context.SaveChangesAsync();        

        return NoContent();
    }
}