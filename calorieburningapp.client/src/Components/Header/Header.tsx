import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { UserDTO } from "../../Data/UserDTO";
import { getUserFromToken } from "../../Utils/getUserFromToken";
import axios from "axios";

const Header: React.FC = () => {
  const [user, setUser] = useState<UserDTO>();
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
      const response = await axios.post(
        "http://localhost:5071/api/v1/login/logout/"
      );
      console.log("Logout response:", response.data);
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      localStorage.removeItem("token");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-header">
      <div className="logo">FURNACE</div>
      {user && user?.Id !== "" && (
        <div className="user-info">
          <span>
            <b>{user.UserName}</b>
          </span>
          <Link to="/" onClick={handleLogout} className="logout-button">
            <button>Logout</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
