namespace CalorieBurningApp.Server.Models;

public class UserDTO{

    public string FullName { get; set; }

    public DateOnly birthday { get; set; }
    public int heightInCm { get ; set; }

    public string UserName { get ; set; }
    public string Id { get ; set; }
    public string Email { get ; set; }
    public string PhoneNumber { get ; set; }

    public DateTime createdDate { get ; set; }
    public DateTime lastLogin { get ; set; }

    public UserDTO( User user ) {
        FullName = user.FullName;
        birthday = user.birthday;
        heightInCm = user.heightInCm;
        Id = user.Id;
        UserName = user.UserName!;
        Email = user.Email!;
        PhoneNumber = user.PhoneNumber!;
        createdDate = user.createdDate;
        lastLogin = user.lastLogin;
    }

    public static explicit operator User(UserDTO userDTO){
        return new User(userDTO.FullName, userDTO.birthday, userDTO.heightInCm, userDTO.UserName, userDTO.Email, userDTO.PhoneNumber);
    }

    public static explicit operator UserDTO(User user){
        return new UserDTO(user);
    }
}