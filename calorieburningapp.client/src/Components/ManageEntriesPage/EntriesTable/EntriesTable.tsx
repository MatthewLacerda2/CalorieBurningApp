import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EntriesTable.css";
import { ExerciseEntry } from "../../../Data/ExerciseEntry";

interface EntriesTableProps {
  filter: GETEntriesFilter;
}

const EntriesTable: React.FC<EntriesTableProps> = ({ filter }) => {
  const [entries, setEntries] = useState<ExerciseEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "http://localhost:5071/api/v1/entries";
        if (filter.userId) {
          url += `/${filter.userId}`;
        }

        const response = await axios.get(url, { params: filter });
        console.log(response);
        if (Array.isArray(response.data)) {
          const exerciseEntries: ExerciseEntry[] = response.data.map(
            (entry: any) => ({
              Id: entry.Id,
              userId: entry.userId,
              exercise: entry.exercise,
              dateTime: new Date(entry.dateTime),
              title: entry.title,
              burnedCalories: entry.burnedCalories,
            })
          );
          setEntries(exerciseEntries);
        } else {
          console.error(
            "Error: response data is not an array. " + response.data
          );
        }
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    fetchData();
  }, [filter]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Exercise</th>
            <th>Burned Calories</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.Id}>
              <td>{entry.title}</td>
              <td>{entry.burnedCalories}</td>
              <td>{entry.exercise}</td>
              <td>{entry.dateTime.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EntriesTable;
