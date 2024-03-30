import { jwtDecode } from "jwt-decode";
import { UserDTO } from "../Data/UserDTO";

export function getUserFromToken(): UserDTO | null {
  const token: string | null = localStorage.getItem("token");
  if (token !== null) {
    try {
      const decodedToken: any = jwtDecode(token);

      const user: UserDTO = JSON.parse(decodedToken.UserDTO);

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
