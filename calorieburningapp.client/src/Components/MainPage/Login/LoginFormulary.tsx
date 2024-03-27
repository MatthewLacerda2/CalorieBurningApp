import React, { useState } from "react";
import Card from "../../Card/Card";
import "../../../Styles/FormularyStyle.css";
import axios from "axios";

interface LoginProps {
  toggleForm: () => void;
}

const LoginFormulary: React.FC<LoginProps> = ({ toggleForm }) => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5071/api/v1/login",
        {
          userName: UserName,
          password: Password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        // Redirect to '/User' page upon successful login
        history.pushState(response.data, "/User");
      } else {
        // Login failed, handle error scenario
        setError("Login failed. Please check your username and password.");
      }
    } catch (error) {
      console.error("Error occurred while logging in:", error);
      setError("An error occurred while logging in. Please try again later.");
    }
  };

  return (
    <Card title="Login">
      <div className="login-form">
        <input
          className="input-text"
          style={{ width: "20em" }}
          type="text"
          placeholder="Username"
          value={UserName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="input-text"
          style={{ width: "20em" }}
          type="password"
          placeholder="Password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="send-button"
          style={{ width: "285px", fontSize: "20px" }}
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          className="send-button"
          style={{ backgroundColor: "blue" }}
          onClick={toggleForm}
        >
          Register
        </button>
        {error && <div className="error-message">{error}</div>}
      </div>
      {/* Removed Link button */}
    </Card>
  );
};

export default LoginFormulary;
