namespace CalorieBurningApp.Server.Models;

public class Streak {

    public string UserId { get; private set; }
    public int count { get; private set; }

    public Streak(string _userId) {
        UserId = _userId;
    }

    public void Increment(){
        count++;
    }

    public void Lose(){ //Tough luck
        count = 0;
    }
}