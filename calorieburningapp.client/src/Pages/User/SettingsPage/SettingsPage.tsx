import React, { useState } from "react";
import { UserSiteSettings } from "../../../Data/UserSiteSettings";
import Card from "../../../Components/Card/Card";
import UserDataFormulary from "../../../Components/SettingsPage/UserDataFormulary/UserDataFormulary";
import UserSiteSettingsFormulary from "../../../Components/SettingsPage/UserSettingsFormulary/UserSettingsFormulary";
import { UserDTO } from "../../../Data/UserDTO";
import { getUserFromToken } from "../../../Utils/getUserFromToken";
import axios from "axios";

const SettingsPage: React.FC = () => {
  const [error, setError] = useState(null);

  const userRegister: UserDTO = getUserFromToken();
  const userSiteSettings: UserSiteSettings = {
    font_scale: 1.0,
    background_color: "black",
  };

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

  const handleUserSiteSettingsSave = (updatedSettings: UserSiteSettings) => {
    try {
      localStorage.setItem("usersitesettings", JSON.stringify(updatedSettings));
      console.log("User site settings saved successfully");
    } catch (error: any) {
      console.error("Error saving user site settings:", error.message);
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
      <Card title="Site Settings">
        <UserSiteSettingsFormulary
          userSiteSettings={userSiteSettings}
          onSave={handleUserSiteSettingsSave}
        />
      </Card>
    </div>
  );
};

export default SettingsPage;
