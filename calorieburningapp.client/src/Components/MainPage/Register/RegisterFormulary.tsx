import React, { useState } from "react";
import Card from "../../Card/Card";
import "../../../Styles/FormularyStyle.css";
import axios from "axios";
import { UserDTO } from "../../../Data/UserDTO";

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
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5071/api/v1/users?password=${password}`,
        userInfo
      );
      console.log("Register response:", response.data);
      // Handle success
    } catch (error: any) {
      console.error("Error registering user:", error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage(
          "An error occurred while registering. Please try again later."
        );
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else {
      setUserInfo({ ...userInfo, [name]: value });
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
          name="fullName"
          value={userInfo.fullName}
          onChange={handleInputChange}
        />
        <input
          className="input-text"
          style={{ width: "20em" }}
          type="date"
          placeholder="Birthday"
          name="birthday"
          value={userInfo.birthday.toISOString().substring(0, 16)}
          onChange={handleInputChange}
        />
        <input
          className="input-text"
          style={{ width: "20em" }}
          type="text"
          placeholder="Username *"
          name="userName"
          value={userInfo.userName}
          onChange={handleInputChange}
          required
        />
        <input
          className="input-text"
          style={{ width: "20em" }}
          type="email"
          placeholder="Email *"
          name="email"
          value={userInfo.email}
          onChange={handleInputChange}
          required
        />
        <input
          className="input-text"
          style={{ width: "20em" }}
          type="text"
          placeholder="Phone Number"
          name="phoneNumber"
          value={userInfo.phoneNumber}
          onChange={handleInputChange}
        />
        <input
          className="input-text"
          style={{ width: "20em" }}
          type="password"
          placeholder="Password *"
          name="password"
          value={password}
          onChange={handleInputChange}
          required
        />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
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
