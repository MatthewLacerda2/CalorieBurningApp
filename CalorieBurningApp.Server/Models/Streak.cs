using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace CalorieBurningApp.Server.Models;

public class Streak
{

    [Key]
    public string UserId { get; set; }

    [Required]
    public string UserName { get; set; }

    [Required]
    public string FullName { get; set; }

    [Required]
    public int count { get; set; }

    [Required]
    public int record { get; private set; }

    public Streak()
    {
        UserId = "";
        UserName = "";
        FullName = "";
    }

    public Streak(string userId, string username, string fullname)
    {
        UserId = userId;
        UserName = username;
        FullName = fullname;
    }

    public void Increment()
    {
        count++;

        if (record < count)
        {
            record = count;
        }
    }

    public void Lose()
    { //Tough luck
        count = 0;
    }
}