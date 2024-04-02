import { jwtDecode } from "jwt-decode";
import { UserDTO } from "../Data/UserDTO";

export function getUserFromToken(): UserDTO {
  const emptyDTO: UserDTO = {
    fullName: "",
    birthday: new Date(),
    createdDate: new Date(),
    lastLogin: new Date(),
    burnedCalories: 0,
    userName: "",
    id: "",
    email: "",
    phoneNumber: "",
  };

  const token: string | null = localStorage.getItem("token");
  if (token !== null) {
    try {
      // Decode the JWT token
      const decodedToken: any = jwtDecode(token);

      // Deserialize the UserDTO from the token
      const user: UserDTO = JSON.parse(decodedToken.UserDTO);

      // Return the deserialized user data
      return user;
    } catch (error) {
      console.error("Error decoding or deserializing JWT token:", error);
      return emptyDTO;
    }
  } else {
    console.error("Token is null or not found in local storage.");
    return emptyDTO;
  }
}
