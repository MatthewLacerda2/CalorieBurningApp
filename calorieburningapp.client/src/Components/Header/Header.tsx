import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
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
      console.log("Logout response:", response.data);
      setUser(null);
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
