import { useEffect, useState } from "react";

interface Props {
  onUpdateFilter: (filter: GETEntriesFilter) => void; // Function to update the filter
}

const GetEntriesFilterFields: React.FC<Props> = ({ onUpdateFilter }) => {
  const [filter, setFilter] = useState<GETEntriesFilter>({
    limit: 20,
    offset: 0,
  });

  // Function to handle changes in the filter and trigger update
  const handleFilterChange = () => {
    onUpdateFilter(filter);
  };

  // Function to handle typing in numeric fields
  const handleNumericChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue)) {
      setFilter({ ...filter, [field]: newValue });
    } else {
      // If input is not a number, clear the field
      setFilter({ ...filter, [field]: undefined });
    }
  };

  // Function to handle typing in date fields
  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const newValue = new Date(event.target.value);
    setFilter({ ...filter, [field]: newValue });
  };

  useEffect(() => {
    handleFilterChange();
  }, [filter]); // Trigger filter update whenever filter changes

  return (
    <div>
      <label>
        Date Min:
        <input
          type="datetime-local"
          value={filter.datetimeMin?.toISOString().slice(0, -8) ?? ""}
          onChange={(e) => handleDateChange(e, "datetimeMin")}
        />
      </label>
      <br />
      <label>
        Date Max:
        <input
          type="datetime-local"
          value={filter.datetimeMax?.toISOString().slice(0, -8) ?? ""}
          onChange={(e) => handleDateChange(e, "datetimeMax")}
        />
      </label>
      <br />
      <label>
        Title:
        <input
          type="text"
          value={filter.title ?? ""}
          onChange={(e) => setFilter({ ...filter, title: e.target.value })}
        />
      </label>
      <br />
      <label>
        Burned Calories Min:
        <input
          type="number"
          min="0"
          max="2000"
          value={filter.burnedCaloriesMin ?? ""}
          onChange={(e) => handleNumericChange(e, "burnedCaloriesMin")}
        />
      </label>
      <br />
      <label>
        Burned Calories Max:
        <input
          type="number"
          min="0"
          max="2000"
          value={filter.burnedCaloriesMax ?? ""}
          onChange={(e) => handleNumericChange(e, "burnedCaloriesMax")}
        />
      </label>
    </div>
  );
};

export default GetEntriesFilterFields;
