namespace CalorieBurningApp.Server.Models;

public class ConsecutiveDays {

    public string UserId { get; private set; }
    public int streak { get; set; }

    public ConsecutiveDays(string _userId) {
        UserId = _userId;
    }

    public void Increment(){
        streak++;
    }

    public void LoseStreak(){
        streak = 0;
    }
}