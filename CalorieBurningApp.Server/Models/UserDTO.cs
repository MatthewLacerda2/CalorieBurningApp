using System.ComponentModel.DataAnnotations;

namespace CalorieBurningApp.Server.Models;

public class UserDTO{

    [StringLength(50)]
    public string FullName { get; set; }

    public DateOnly birthday { get; set; }

    [Required]
    [StringLength(50)]
    public string UserName { get ; set; }

    [Required]
    public string Id { get ; set; }

    [Required]
    public string Email { get ; set; }

    [Required]
    [StringLength(15)]
    public string PhoneNumber { get ; set; }

    [Required]
    public DateTime createdDate { get ; set; }

    [Required]
    public DateTime lastLogin { get ; set; }

    public int burnedCalories { get ; set; }

    public UserDTO( User user ) {
        FullName = user.FullName;
        birthday = user.birthday;
        Id = user.Id;
        UserName = user.UserName!;
        Email = user.Email!;
        PhoneNumber = user.PhoneNumber!;
        createdDate = user.createdDate;
        lastLogin = user.lastLogin;
        burnedCalories = user.burnedCalories;
    }

    public static explicit operator User(UserDTO userDTO){
        return new User(userDTO.FullName, userDTO.birthday, userDTO.UserName, userDTO.Email, userDTO.PhoneNumber);
    }

    public static explicit operator UserDTO(User user){
        return new UserDTO(user);
    }
}