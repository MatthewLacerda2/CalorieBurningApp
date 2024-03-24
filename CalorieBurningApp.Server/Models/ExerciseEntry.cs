namespace CalorieBurningApp.Server.Models;

public class ExerciseEntry {

    public Guid Id { get; private set; }
    public EExercise exercise { get; set; }
    public string userId { get; set; }
    public DateTime dateTime { get; set; }
    public string title { get; set; }
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