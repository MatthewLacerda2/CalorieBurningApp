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
          id="FullName"
          name="FullName"
          value={updatedUser.FullName}
          onChange={handleInputChange}
        />
      </div>
      {/*
        <div>
          <label htmlFor="birthday">Birthday:</label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={updatedUser.birthday.toISOString().slice(0, 10)} // Format to YYYY-MM-DD
            onChange={handleInputChange}
          />
        </div>*/}
      <div>
        <label htmlFor="userName">Username:</label>
        <input
          type="text"
          id="UserName"
          name="UserName"
          value={updatedUser.UserName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="Email"
          name="Email"
          value={updatedUser.Email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="PhoneNumber"
          name="PhoneNumber"
          value={updatedUser.PhoneNumber}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default UserDataFormulary;
