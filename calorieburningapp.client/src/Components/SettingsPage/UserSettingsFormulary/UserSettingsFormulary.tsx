import React, { useState } from "react";
import { UserSiteSettings } from "../../../Data/UserSiteSettings";

interface UserSiteSettingsFormularyProps {
  userSiteSettings: UserSiteSettings;
  onSave: (updatedSettings: UserSiteSettings) => void;
}

const UserSiteSettingsFormulary: React.FC<UserSiteSettingsFormularyProps> = ({
  userSiteSettings,
  onSave,
}) => {
  const [updatedSettings, setUpdatedSettings] =
    useState<UserSiteSettings>(userSiteSettings);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedSettings((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(updatedSettings);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fontScale">Font Scale:</label>
        <input
          type="number"
          id="fontScale"
          name="fontScale"
          value={updatedSettings.font_scale}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="backgroundColor">Background Color:</label>
        <input
          type="text"
          id="backgroundColor"
          name="background_color"
          value={updatedSettings.background_color}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default UserSiteSettingsFormulary;
