import React, { useState } from "react";
import Card from "../../Card/Card";
import "../../../Styles/FormularyStyle.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserRegister } from "../../../Data/UserRegister";

interface RegisterProps {
  toggleForm: () => void;
}

const RegisterFormulary: React.FC<RegisterProps> = ({ toggleForm }) => {
  const [userInfo, setUserInfo] = useState<UserRegister>({
    Id: "",
    FullName: "",
    birthday: new Date(),
    UserName: "",
    Email: "",
    PhoneNumber: "",
    currentPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    setUserInfo({ ...userInfo, birthday: selectedDate });
  };

  const handleRegister = async () => {
    if (userInfo.currentPassword !== userInfo.newPassword) {
      setError("Password confirmation failed");
      return;
    }

    try {
      const formattedUserInfo = {
        ...userInfo,
        birthday: userInfo.birthday.toISOString().split("T")[0],
      };

      console.log(formattedUserInfo);

      const response = await axios.post(
        `http://localhost:5071/api/v1/users?password=${userInfo.currentPassword}`,
        formattedUserInfo,
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
      console.error("Error registering user:", error);
      console.error("Error response:", error.response);
      setError("Error registering user. Please try again.");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5071/api/v1/login",
        {
          userName: userInfo.UserName,
          password: userInfo.currentPassword,
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
          value={userInfo.FullName}
          onChange={(e) =>
            setUserInfo({ ...userInfo, FullName: e.target.value })
          }
        />
        <input
          className="input-text"
          style={{ width: "20em" }}
          type="text"
          placeholder="Username"
          value={userInfo.UserName}
          onChange={(e) =>
            setUserInfo({ ...userInfo, UserName: e.target.value })
          }
        />
        <input
          className="input-text"
          style={{ width: "20em" }}
          type="email"
          placeholder="Email"
          value={userInfo.Email}
          onChange={(e) => setUserInfo({ ...userInfo, Email: e.target.value })}
        />
        <input
          className="input-text"
          style={{ width: "20em" }}
          type="text"
          placeholder="Phone Number"
          value={userInfo.PhoneNumber}
          onChange={(e) =>
            setUserInfo({ ...userInfo, PhoneNumber: e.target.value })
          }
        />
        <input
          className="input-text"
          style={{ width: "20em" }}
          type="date"
          value={userInfo.birthday.getDate()}
          onChange={handleDateChange}
        />
        <input
          className="input-text"
          style={{ width: "20em" }}
          type="password"
          placeholder="Password"
          value={userInfo.currentPassword}
          onChange={(e) =>
            setUserInfo({ ...userInfo, currentPassword: e.target.value })
          }
        />
        <input
          className="input-text"
          style={{ width: "20em" }}
          type="password"
          placeholder="Password"
          value={userInfo.newPassword}
          onChange={(e) =>
            setUserInfo({ ...userInfo, newPassword: e.target.value })
          }
        />
        <p></p>
        {error && error}
        <button
          className="send-button"
          style={{ width: "105px", fontSize: "20px" }}
          onClick={handleRegister}>
          Register
        </button>
        <p style={{ marginTop: "20px", marginBottom: "-3px" }}>
          Already have an account?
        </p>
        <button
          style={{
            color: "blue",
            width: "100px",
            fontSize: "18px",
            backgroundColor: "transparent",
          }}
          onClick={toggleForm}>
          Login
        </button>
      </div>
    </Card>
  );
};

export default RegisterFormulary;
