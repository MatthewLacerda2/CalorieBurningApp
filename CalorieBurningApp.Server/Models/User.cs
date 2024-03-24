using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace CalorieBurningApp.Server.Models;

public class User : IdentityUser {

    [StringLength(50)]
    public string FullName { get; set; }

    public DateOnly birthday { get; set; }

    [Range(128, 255)]
    public int heightInCm { get ; set; }

    [Required]
    public DateTime createdDate { get ; set; }
    
    [Required]
    public DateTime lastLogin { get ; set; }

    public User(string _fullName, DateOnly _birthday, int _heightInCm, string _userName, string _email, string _phoneNumber){
        FullName = _fullName;
        birthday = _birthday;
        heightInCm = _heightInCm;

        UserName = _userName;
        Email = _email;
        PhoneNumber = _phoneNumber;

        createdDate = DateTime.Now;
        lastLogin = DateTime.Now;
    }
}