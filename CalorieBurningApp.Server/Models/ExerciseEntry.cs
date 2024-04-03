using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace CalorieBurningApp.Server.Models;

public class ExerciseEntry
{

    [Key]
    public string Id { get; private set; }

    public string userId { get; set; }

    [Required]
    public EExercise exercise { get; set; }
    public DateTime dateTime { get; set; }

    [StringLength(50)]
    public string title { get; set; }

    [Required]
    [Range(1, 2000)]
    public int burnedCalories { get; set; }

    public ExerciseEntry()
    {
        Id = Guid.NewGuid().ToString();
        userId = "";
        title = "";
    }

    public ExerciseEntry(string _userId, EExercise _exercise, DateTime _dateTime, string _title, int _burnedCalories)
    {
        Id = Guid.NewGuid().ToString();
        userId = _userId;
        exercise = _exercise;
        dateTime = _dateTime;
        title = _title;
        burnedCalories = _burnedCalories;
    }
}