using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CalorieBurningApp.Server.Models;

public class ExerciseEntry {

    [ForeignKey("user")]
    public string userId { get; set; }

    [JsonIgnore]
    public User user { get; set; }

    [Key]
    public Guid Id { get; private set; }

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
        user=new User();
        title="";
    }

    public ExerciseEntry(EExercise _exercise, string _userId, User myUser, DateTime _dateTime, string _title, int _burnedCalories){
        Id = Guid.NewGuid();        
        exercise = _exercise;
        userId = _userId;
        user = myUser;
        dateTime = _dateTime;
        title = _title;
        burnedCalories = _burnedCalories;
    }
}