import React, { useState } from "react";
import { UserDTO } from "../../../Data/UserDTO";

interface UserDataFormularyProps {
  userRegister: UserDTO;
  onSave: (updatedUser: UserDTO) => void;
}

const UserDataFormulary: React.FC<UserDataFormularyProps> = ({
  userRegister,
  onSave,
}) => {
  const [updatedUser, setUpdatedUser] = useState<UserDTO>(userRegister);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(updatedUser);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={updatedUser.fullName}
          onChange={handleInputChange}
        />
      </div>
      {/* Add other input fields for birthday, username, email, and phoneNumber */}
      <button type="submit">Save</button>
    </form>
  );
};

export default UserDataFormulary;
