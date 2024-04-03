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
      <div>
        <label htmlFor="birthday">Birthday:</label>
        <input
          type="date"
          id="birthday"
          name="birthday"
          value={updatedUser.birthday.toISOString().slice(0, 10)} // Format to YYYY-MM-DD
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="userName">Username:</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={updatedUser.userName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={updatedUser.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={updatedUser.phoneNumber}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default UserDataFormulary;
