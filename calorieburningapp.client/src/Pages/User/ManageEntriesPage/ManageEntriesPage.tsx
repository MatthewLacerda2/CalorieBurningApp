import React, { useState, useEffect } from "react";
import EntriesTable from "../../../Components/ManageEntriesPage/EntriesTable/EntriesTable";
import { UserDTO } from "../../../Data/UserDTO";
import { getUserFromToken } from "../../../Utils/getUserFromToken";

const ManageEntriesPage: React.FC = () => {
  const [filter, setFilter] = useState<GETEntriesFilter | undefined>(undefined);

  useEffect(() => {
    const user: UserDTO | null = getUserFromToken();

    if (user !== null) {
      // Create a filter object with the userId set from the UserDTO
      const newFilter: GETEntriesFilter = {
        datetimeMin: undefined,
        datetimeMax: undefined,
        userId: user.userId, // Set userId from the deserialized UserDTO
        title: undefined,
        burnedCaloriesMin: 0,
        burnedCaloriesMax: 2000,
        offset: 0,
        limit: 10,
        sort: "datetime",
      };

      // Set the filter state
      setFilter(newFilter);
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
