import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ExerciseEntry } from '../../../Data/ExerciseEntry';
import './EntriesTable.css';
import EExercise from '../../../Data/EExercise';

interface EntriesTableProps {
  filter: GETEntriesFilter;
}

const EntriesTable: React.FC<EntriesTableProps> = ({ filter }) => {

  const [entries, setEntries] = useState<ExerciseEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'http://localhost:5071/api/v1/entries';
        if (filter.userId) {
          url += `/${filter.userId}`;
        }

        const response = await axios.get(url, { params: filter });
        if (Array.isArray(response.data)) {
        const exerciseEntries: ExerciseEntry[] = response.data.map((entry: any) => ({
            Id: entry.Id,
            userId: entry.userId,
            exercise: entry.exercise,
            dateTime: new Date(entry.dateTime),
            title: entry.title,
            burnedCalories: entry.burnedCalories
        }));
        setEntries(exerciseEntries);
        } else {
        console.error('Error: response data is not an array');
        console.log(response.data);

        // Placeholder data
        const exerciseEntries: ExerciseEntry[] = [
            {
            Id: "1",
            userId: "user1",
            exercise: EExercise.walking,
            dateTime: new Date(),
            title: "Morning Run",
            burnedCalories: 200
            },
            {
            Id: "2",
            userId: "user2",
            exercise: EExercise.cycling,
            dateTime: new Date(),
            title: "Afternoon Ride",
            burnedCalories: 150
            }
        ];

        setEntries(exerciseEntries);
        }

      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };

    fetchData();
  }, [filter]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Date & Time</th>
            <th>Title</th>
            <th>Burned Calories</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.Id}>
              <td>{entry.exercise}</td>
              <td>{entry.dateTime.toLocaleString()}</td>
              <td>{entry.title}</td>
              <td>{entry.burnedCalories}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EntriesTable;
