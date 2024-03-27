import React from 'react';
import EntriesTable from '../../../Components/ManageEntriesPage/EntriesTable/EntriesTable';

const ManageEntriesPage: React.FC = () => {

  const filter: GETEntriesFilter = {
    datetimeMin: undefined,
    datetimeMax: undefined,
    userId: undefined,
    title: undefined,
    burnedCaloriesMin: 0,
    burnedCaloriesMax: 2000,
    offset: 0,
    limit: 10,
    sort: undefined
  };

  return (
    <div>
      <h1>Manage Entries Page is here</h1>
      <EntriesTable filter={filter} ></EntriesTable>
    </div>
  );
}

export default ManageEntriesPage;