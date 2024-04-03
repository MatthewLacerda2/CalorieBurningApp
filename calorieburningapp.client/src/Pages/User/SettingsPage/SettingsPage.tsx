import React, { useState } from "react";
import Card from "../../../Components/Card/Card";
import UserDataFormulary from "../../../Components/SettingsPage/UserDataFormulary/UserDataFormulary";
import { UserDTO } from "../../../Data/UserDTO";
import { getUserFromToken } from "../../../Utils/getUserFromToken";
import axios from "axios";

const SettingsPage: React.FC = () => {
  const [error, setError] = useState(null);

  const userRegister: UserDTO = getUserFromToken();

  const handleUserDataSave = async (updatedUser: UserDTO) => {
    try {
      await axios.patch(
        "http://localhost:5071/api/v1/users",
        {
          ...updatedUser,
          currentPassword: "",
          newPassword: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("User data updated successfully");
    } catch (error: any) {
      console.error("Error updating user data:", error.message);
      setError(error.message);
    }
  };

  return (
    <div>
      <Card title="User Data">
        <UserDataFormulary
          userRegister={userRegister}
          onSave={handleUserDataSave}
        />
        {error !== null && <div>{error}</div>}
      </Card>
    </div>
  );
};

export default SettingsPage;
