using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CalorieBurningApp.Server.Models;

public class ExerciseEntry {

    public string userId { get; set; }
    public Guid Id { get; private set; }

    [Required]
    public EExercise exercise { get; set; }
    public DateTime dateTime { get; set; }

    [StringLength(50)]
    public string title { get; set; }

    [Required]
    [Range(0,100)]
    public int burnedCalories { get; set; }

    public ExerciseEntry(EExercise _exercise, string _userId, DateTime _dateTime, string _title, int _burnedCalories){
        Id = Guid.NewGuid();        
        exercise = _exercise;
        userId = _userId;
        dateTime = _dateTime;
        title = _title;
        burnedCalories = _burnedCalories;
    }
}