import React from "react";
import { UserRegister } from "../../../Data/UserRegister";
import { UserSiteSettings } from "../../../Data/UserSiteSettings";
import Card from "../../../Components/Card/Card";
import UserDataFormulary from "../../../Components/SettingsPage/UserDataFormulary/UserDataFormulary";
import UserSiteSettingsFormulary from "../../../Components/SettingsPage/UserSettingsFormulary/UserSettingsFormulary";

interface SettingsPageProps {
  userRegister: UserRegister;
  userSiteSettings: UserSiteSettings;
}

const SettingsPage: React.FC<SettingsPageProps> = ({
  userRegister,
  userSiteSettings,
}) => {
  const handleUserDataSave = async (updatedUser: UserRegister) => {
    try {
      // Send PATCH request to update user data
      const response = await fetch("http://localhost:5071/api/v1/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData);
      }
      // Handle success
      console.log("User data updated successfully");
    } catch (error: any) {
      console.error("Error updating user data:", error.message);
    }
  };

  const handleUserSiteSettingsSave = (updatedSettings: UserSiteSettings) => {
    try {
      // Save user site settings to local storage
      localStorage.setItem("usersitesettings", JSON.stringify(updatedSettings));
      // Handle success
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
