using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CalorieBurningApp.Server.Models;

public class Streak {

    [Key]
    [ForeignKey("User")]
    public string UserId { get; set; }

    [Required]
    public int count { get; set; }

    [JsonIgnore]
    public User User { get; set; }

    public Streak(){
        UserId = "";
        count=0;
        User=new User();
    }

    public Streak(string userId, User user) {
        UserId = userId;
        User = user;
    }

    public void Increment(){
        count++;
    }

    public void Lose(){ //Tough luck
        count = 0;
    }
}