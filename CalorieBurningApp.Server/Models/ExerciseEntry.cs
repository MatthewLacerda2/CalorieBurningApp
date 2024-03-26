using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace CalorieBurningApp.Server.Models;

public class ExerciseEntry {

    [Key]
    public Guid Id { get; private set; }

    [ForeignKey("userId")]
    public string userId { get; set; }

    [Required]
    public EExercise exercise { get; set; }
    public DateTime dateTime { get; set; }

    [StringLength(50)]
    public string title { get; set; }

    [Required]
    [Range(1,2000)]
    public int burnedCalories { get; set; }

    public ExerciseEntry(){
        userId="";
        title="";
    }

    public ExerciseEntry(string _userId, EExercise _exercise, DateTime _dateTime, string _title, int _burnedCalories){
        Id = Guid.NewGuid();
        userId = _userId;
        exercise = _exercise;
        dateTime = _dateTime;
        title = _title;
        burnedCalories = _burnedCalories;
    }
}