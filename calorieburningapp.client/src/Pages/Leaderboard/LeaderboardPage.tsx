import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserDTO } from "../../Data/UserDTO";

const LeaderboardPage: React.FC = () => {
  const [streaks, setStreaks] = useState<UserDTO[]>([]);

  useEffect(() => {
    const fetchStreaks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5071/api/v1/leaderboard?limit=10"
        );
        setStreaks(response.data);
      } catch (error) {
        console.error("Error fetching streak records:", error);
      }
    };

    fetchStreaks();
  }, []);

  return (
    <div>
      <h2>Burned Calories Rank</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>UserName</th>
            <th>Burned Calories</th>
          </tr>
        </thead>
        <tbody>
          {streaks.map((streak, index) => (
            <tr key={streak.id}>
              <td>#{index + 1}</td>
              <td>{streak.userName}</td>
              <td>{streak.burnedCalories}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardPage;
