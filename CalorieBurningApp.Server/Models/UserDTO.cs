namespace CalorieBurningApp.Server.Models;

public class UserDTO{

    public string FullName { get; set; }

    public DateOnly birthday { get; set; }
    public int heightInCm { get ; set; }

    public string UserName { get ; set; }
    public string Id { get ; set; }
    public string Email { get ; set; }
    public string PhoneNumber { get ; set; }

    public UserDTO( User user ) {
        FullName = user.FullName;
        birthday = user.birthday;
        heightInCm = user.heightInCm;
        Id = user.Id;
        UserName = user.UserName!;
        Email = user.Email!;
        PhoneNumber = user.PhoneNumber!;
    }
}