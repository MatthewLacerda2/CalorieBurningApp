import { useEffect, useState } from "react";
import { getUserFromToken } from "../../../Utils/getUserFromToken";
import { UserDTO } from "../../../Data/UserDTO";
import GetEntriesFilterFields from "../../../Components/ManageEntriesPage/EntriesFiltersFields/GETEntriesFilterFields";
import EntriesTable from "../../../Components/ManageEntriesPage/EntriesTable/EntriesTable";

const ManageEntriesPage: React.FC = () => {
  const [filter, setFilter] = useState<GETEntriesFilter | undefined>(undefined);

  const updateFilter = (newFilter: GETEntriesFilter) => {
    setFilter(newFilter);
  };

  useEffect(() => {
    const user: UserDTO = getUserFromToken();

    if (user !== null) {
      const newFilter: GETEntriesFilter = {
        datetimeMin: undefined,
        datetimeMax: undefined,
        userId: user.id,
        title: undefined,
        burnedCaloriesMin: 0,
        burnedCaloriesMax: 2000,
        offset: 0,
        limit: 10,
        sort: "datetime",
      };

      setFilter(newFilter);
    } else {
      console.error("Token is null or not found in local storage.");
    }
  }, []);

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
