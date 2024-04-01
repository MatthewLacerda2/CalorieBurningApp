import React, { useState } from "react";
import Card from "../../Card/Card";
import "../../../Styles/FormularyStyle.css";
import { UserDTO } from "../../../Data/UserDTO";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface RegisterProps {
  toggleForm: () => void;
}

const RegisterFormulary: React.FC<RegisterProps> = ({ toggleForm }) => {
  const [userInfo, setUserInfo] = useState<UserDTO>({
    fullName: "",
    birthday: new Date(),
    createdDate: new Date(),
    lastLogin: new Date(),
    burnedCalories: 0,
    userName: "",
    id: "",
    email: "",
    phoneNumber: "",
  });
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      console.log(userInfo);
      const response = await axios.post(
        `http://localhost:5071/api/v1/users?password=${password}`,
        userInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Register response:", response.data);

      if (response.status === 200) {
        await handleLogin();
      }
    } catch (error: any) {
      console.error("XXXError registering user:", error);
      console.error("XXXError registering user:", error.response);
      console.error("XXXError registering user:", error.response.data);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5071/api/v1/login",
        {
          userName: userInfo.userName,
          password: password,
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
        navigate("/User");
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error occurred while logging in:", error);
    }
  };

  return (
    <Card title="Register">
      <div className="login-form">
        <input
          className="input-text"
          style={{ width: "20em" }}
          type="text"
          placeholder="Full Name"
          value={userInfo.fullName}
          onChange={(e) =>
            setUserInfo({ ...userInfo, fullName: e.target.value })
          }
        />
        <input
          className="input-text"
          style={{ width: "20em" }}
          type="text"
          placeholder="Username"
          value={userInfo.userName}
          onChange={(e) =>
            setUserInfo({ ...userInfo, userName: e.target.value })
          }
        />
        <input
          className="input-text"
          style={{ width: "20em" }}
          type="email"
          placeholder="Email"
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        />
        <input
          className="input-text"
          style={{ width: "20em" }}
          type="text"
          placeholder="Phone Number"
          value={userInfo.phoneNumber}
          onChange={(e) =>
            setUserInfo({ ...userInfo, phoneNumber: e.target.value })
          }
        />
        <input
          className="input-text"
          style={{ width: "20em" }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p></p>
        <button
          className="send-button"
          style={{ width: "105px", fontSize: "20px" }}
          onClick={handleRegister}>
          Register
        </button>
        <p></p>
        <button
          className="send-button"
          style={{ width: "85px", backgroundColor: "blue" }}
          onClick={toggleForm}>
          Login
        </button>
      </div>
    </Card>
  );
};

export default RegisterFormulary;
