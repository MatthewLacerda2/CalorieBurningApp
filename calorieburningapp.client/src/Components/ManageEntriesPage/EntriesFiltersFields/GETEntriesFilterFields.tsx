import { useEffect, useState } from "react";
import "../../../Styles/FormularyStyle.css";

interface Props {
  onUpdateFilter: (filter: GETEntriesFilter) => void;
}

const GetEntriesFilterFields: React.FC<Props> = ({ onUpdateFilter }) => {
  const [filter, setFilter] = useState<GETEntriesFilter>({
    limit: 10,
    offset: 0,
  });

  const handleFilterChange = () => {
    onUpdateFilter(filter);
  };

  const handleNumericChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue)) {
      setFilter({ ...filter, [field]: newValue });
    } else {
      setFilter({ ...filter, [field]: undefined });
    }
  };

  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const newValue = new Date(event.target.value);
    setFilter({ ...filter, [field]: newValue });
  };

  useEffect(() => {
    handleFilterChange();
  }, [filter]);

  return (
    <div>
      <label>
        Date Min:
        <input
          className="input-text"
          type="datetime-local"
          value={filter.datetimeMin?.toISOString().slice(0, -8) ?? ""}
          onChange={(e) => handleDateChange(e, "datetimeMin")}
        />
      </label>
      <label>
        Date Max:
        <input
          className="input-text"
          type="datetime-local"
          value={filter.datetimeMax?.toISOString().slice(0, -8) ?? ""}
          onChange={(e) => handleDateChange(e, "datetimeMax")}
        />
      </label>
      <br />
      <p></p>
      <label>
        Title:
        <input
          className="input-text"
          type="text"
          value={filter.title ?? ""}
          onChange={(e) => setFilter({ ...filter, title: e.target.value })}
        />
      </label>
      <label>
        Burned Calories Min:
        <input
          className="input-text"
          type="number"
          min="0"
          max="2000"
          value={filter.burnedCaloriesMin ?? ""}
          onChange={(e) => handleNumericChange(e, "burnedCaloriesMin")}
        />
      </label>
      <label>
        Burned Calories Max:
        <input
          className="input-text"
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
