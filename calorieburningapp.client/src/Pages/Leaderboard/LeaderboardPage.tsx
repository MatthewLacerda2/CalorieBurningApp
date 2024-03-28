import React, { useEffect, useState } from "react";
import axios from "axios";
import { Streak } from "../../Data/Streak";
import { UserDTO } from "../../Data/UserDTO";

const LeaderboardPage: React.FC = () => {
  const [streaks, setStreaks] = useState<UserDTO[]>([]);

  useEffect(() => {
    const fetchStreaks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5071/api/v1/leaderboard?limit=10"
        );
        console.log("response.data:", response.data); // inspect the structure of response.data
        setStreaks(response.data);
      } catch (error) {
        console.error("Error fetching streak records:", error);
      }
    };

    fetchStreaks();
  }, []);

  useEffect(() => {
    console.log("streaks:", streaks); // log streaks after they're set
  }, [streaks]); // Add streaks to the dependency array

  return (
    <div>
      <h2>Streak Records</h2>
      <table>
        <thead>
          <tr>
            <th>UserName</th>
            <th>burnedCalories</th>
          </tr>
        </thead>
        <tbody>
          {streaks.map((streak) => (
            <tr key={streak.id}>
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
