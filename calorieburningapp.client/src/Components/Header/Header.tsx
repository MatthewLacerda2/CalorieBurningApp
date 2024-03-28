import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom"; // Import Link component
import { UserDTO } from "../../Data/UserDTO";
import { getUserFromToken } from "../../Utils/getUserFromToken";
import axios from "axios";

const Header: React.FC = () => {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserFromToken();
      setUser(userData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:5071/api/v1/logout/");
      console.log("Logout response:", response.data); // Log the response data
      // Handle any other actions after successful logout if needed
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle error
    } finally {
      // Delete the token from local storage regardless of the response status
      localStorage.removeItem("token");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Render loading indicator while fetching user data
  }

  return (
    <div className="main-header">
      <div className="logo">{user ? user.userName : "FURNACE"}</div>
      {user && (
        <div style={{ textAlign: "left" }}>
          <span>Welcome {user.userName}</span>
          <Link to="/" onClick={handleLogout}>
            <button>Logout</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
