import React, { useState, useEffect } from "react";
import EntriesTable from "../../../Components/ManageEntriesPage/EntriesTable/EntriesTable";
import { UserDTO } from "../../../Data/UserDTO";
import { jwtDecode } from "jwt-decode";

const ManageEntriesPage: React.FC = () => {
  const [filter, setFilter] = useState<GETEntriesFilter | undefined>(undefined);

  useEffect(() => {
    const token: string | null = localStorage.getItem("token");

    if (token !== null) {
      try {
        // Decode the JWT token
        const decodedToken: any = jwtDecode(token);

        // Deserialize the UserDTO from the token
        const user: UserDTO = JSON.parse(decodedToken.UserDTO);

        // Log the deserialized user data
        console.log("User Data:", user);

        // Create a filter object with the userId set from the UserDTO
        const newFilter: GETEntriesFilter = {
          datetimeMin: undefined,
          datetimeMax: undefined,
          userId: user.id, // Set userId from the deserialized UserDTO
          title: undefined,
          burnedCaloriesMin: 0,
          burnedCaloriesMax: 2000,
          offset: 0,
          limit: 10,
          sort: "datetime",
        };

        console.log("Filter:", newFilter);

        // Set the filter state
        setFilter(newFilter);
      } catch (error) {
        console.error("Error decoding or deserializing JWT token:", error);
      }
    } else {
      console.error("Token is null or not found in local storage.");
    }
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <h1>Manage Entries Page is here</h1>
      {filter && <EntriesTable filter={filter} />}
    </div>
  );
};

export default ManageEntriesPage;
