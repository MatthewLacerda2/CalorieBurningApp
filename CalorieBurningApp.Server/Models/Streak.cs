using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace CalorieBurningApp.Server.Models;

public class Streak
{

    [Key]
    public string UserId { get; set; }

    [Required]
    public int count { get; set; }

    [Required]
    public int record { get; private set; }

    public Streak()
    {
        UserId = "";
    }

    public Streak(string userId)
    {
        UserId = userId;
    }

    public void Increment()
    {
        count++;

        if (record > count)
        {
            record = count;
        }
    }

    public void Lose()
    { //Tough luck
        count = 0;
    }
}