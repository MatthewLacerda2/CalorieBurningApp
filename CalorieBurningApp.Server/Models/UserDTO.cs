using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace CalorieBurningApp.Server.Models;

public class UserDTO{

    [JsonProperty]
    [StringLength(50)]
    public string FullName { get; set; }

    [JsonProperty]
    public DateOnly birthday { get; set; }

    [JsonProperty]
    [Required]
    public DateTime createdDate { get ; set; }

    [JsonProperty]
    [Required]
    public DateTime lastLogin { get ; set; }

    [JsonProperty]
    [Required]
    public int burnedCalories { get ; set; }

    [JsonProperty]
    [Required]
    [StringLength(50)]
    public string UserName { get ; set; }

    [JsonProperty]
    [Required]
    public string Id { get ; set; }

    [JsonProperty]
    [Required]
    public string Email { get ; set; }

    [JsonProperty]
    [Required]
    [StringLength(15)]
    public string PhoneNumber { get ; set; }

    [JsonConstructor]
    public UserDTO(){
        this.FullName = string.Empty;
        this.UserName = string.Empty;
        this.Id = string.Empty;        
        this.Email = string.Empty;
        this.PhoneNumber = string.Empty;

        createdDate=DateTime.Now;
        lastLogin=createdDate;
        birthday=DateOnly.MinValue;
    }

    public UserDTO( User user ) {
        this.FullName = user.FullName;
        this.birthday = user.birthday;
        this.createdDate = user.createdDate;
        this.lastLogin = user.lastLogin;
        this.burnedCalories = user.burnedCalories;
        this.UserName = user.UserName!;
        this.Id = user.Id;        
        this.Email = user.Email!;
        this.PhoneNumber = user.PhoneNumber!;
    }

    public static explicit operator User(UserDTO userDTO){
        return new User(userDTO.FullName, userDTO.birthday, userDTO.UserName, userDTO.Email, userDTO.PhoneNumber);
    }

    public static explicit operator UserDTO(User user){
        return new UserDTO(user);
    }
}