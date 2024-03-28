import { useEffect, useState } from "react";
import { getUserFromToken } from "../../../Utils/getUserFromToken";
import { UserDTO } from "../../../Data/UserDTO";
import GetEntriesFilterFields from "../../../Components/ManageEntriesPage/EntriesFiltersFields/GETEntriesFilterFields";
import EntriesTable from "../../../Components/ManageEntriesPage/EntriesTable/EntriesTable";

const ManageEntriesPage: React.FC = () => {
  const [filter, setFilter] = useState<GETEntriesFilter | undefined>(undefined);

  // Function to update the filter
  const updateFilter = (newFilter: GETEntriesFilter) => {
    setFilter(newFilter);
  };

  useEffect(() => {
    const user: UserDTO | null = getUserFromToken();

    if (user !== null) {
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

      // Set the filter state
      setFilter(newFilter);
    } else {
      console.error("Token is null or not found in local storage.");
    }
  }, []); // Empty dependency array to run the effect only once

  console.log(filter);

  return (
    <div>
      <GetEntriesFilterFields onUpdateFilter={updateFilter} />
      <h2>Your Exercises</h2>
      {filter && <EntriesTable filter={filter} />}
    </div>
  );
};

export default ManageEntriesPage;
