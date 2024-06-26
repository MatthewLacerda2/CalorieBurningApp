using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace CalorieBurningApp.Server.Models;

public class UserRegister
{

    public string Id { get; set; }

    [JsonProperty]
    [StringLength(50)]
    public string FullName { get; set; }

    [JsonProperty]
    public DateOnly birthday { get; set; }

    [JsonProperty]
    [Required]
    [StringLength(50)]
    public string UserName { get; set; }

    [JsonProperty]
    [EmailAddress]
    [Required]
    public string Email { get; set; }

    [JsonProperty]
    [Phone]
    [Required]
    [StringLength(15)]
    public string PhoneNumber { get; set; }

    [JsonProperty]
    [PasswordPropertyText]
    [Required]
    public string currentPassword { get; set; }

    [JsonProperty]
    [PasswordPropertyText]
    [Required]
    public string newPassword { get; set; }

    [JsonConstructor]
    public UserRegister()
    {
        this.Id = string.Empty;
        this.FullName = string.Empty;
        this.birthday = DateOnly.MinValue;
        this.UserName = string.Empty;
        this.Email = string.Empty;
        this.PhoneNumber = string.Empty;
        this.currentPassword = string.Empty;
        this.newPassword = string.Empty;
    }

    public static explicit operator User(UserRegister userDTO)
    {
        return new User(userDTO.FullName, userDTO.birthday, userDTO.UserName, userDTO.Email, userDTO.PhoneNumber);
    }
}