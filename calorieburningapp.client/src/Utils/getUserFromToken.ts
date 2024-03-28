import { jwtDecode } from "jwt-decode";
import { UserDTO } from "../Data/UserDTO";

export function getUserFromToken(): UserDTO | null {
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
      return null;
    }
  } else {
    console.error("Token is null or not found in local storage.");
    return null;
  }
}
