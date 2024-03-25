using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CalorieBurningApp.Server.Models;

public class Streak {

    [Key]
    [ForeignKey("user")]
    public string UserId { get; set; }

    [Required]
    public int count { get; private set; }

    [JsonIgnore]
    public User user { get; set; }

    public Streak(){
        UserId = "";
        count=0;
        user=new User();
    }

    public Streak(string _userId, User myUser) {
        UserId = _userId;
        user = myUser;
    }

    public void Increment(){
        count++;
    }

    public void Lose(){ //Tough luck
        count = 0;
    }
}