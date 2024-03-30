import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserDTO } from "../../Data/UserDTO";
import { Streak } from "../../Data/Streak";

const LeaderboardPage: React.FC = () => {
  const [burnedCalories, setBurnedCalories] = useState<UserDTO[]>([]);
  const [currentStreaks, setCurrentStreaks] = useState<Streak[]>([]);
  const [recordStreaks, setRecordStreaks] = useState<Streak[]>([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const burnedCaloriesResponse = await axios.get(
          "http://localhost:5071/api/v1/leaderboard/calories/?offset=0&limit=10"
        );
        setBurnedCalories(burnedCaloriesResponse.data);

        const currentResponse = await axios.get(
          "http://localhost:5071/api/v1/leaderboard/streaks/?sort=count&offset=0&limit=10"
        );
        console.log("Current Streaks Response:", currentResponse.data);
        setCurrentStreaks(currentResponse.data);

        const recordResponse = await axios.get(
          "http://localhost:5071/api/v1/leaderboard/streaks/?sort=record&offset=0&limit=10"
        );
        console.log("Record Streaks Response:", recordResponse.data);
        setRecordStreaks(recordResponse.data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div>
      <h2>Burned Calories Rank</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>UserName</th>
            <th>FullName</th>
            <th>Burned Calories</th>
          </tr>
        </thead>
        <tbody>
          {burnedCalories.map((user, index) => (
            <tr key={user.id}>
              <td>#{index + 1}</td>
              <td>{user.userName}</td>
              <td>{user.fullName}</td>
              <td>{user.burnedCalories}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <h2>Current Streaks Rank</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>UserName</th>
            <th>Full Name</th>
            <th>Current Streak</th>
            <th>Record</th>
          </tr>
        </thead>
        <tbody>
          {currentStreaks.map((streak, index) => (
            <tr key={streak.UserId}>
              <td>#{index + 1}</td>
              <td>{streak.UserName}</td>
              <td>{streak.FullName}</td>
              <td>{streak.count}</td>
              <td>{streak.record}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <h2>Record Streaks Ranks</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>UserName</th>
            <th>Full Name</th>
            <th>Record</th>
            <th>Current Streak</th>
          </tr>
        </thead>
        <tbody>
          {recordStreaks.map((streak, index) => (
            <tr key={streak.UserId}>
              <td>#{index + 1}</td>
              <td>{streak.UserName}</td>
              <td>{streak.FullName}</td>
              <td>{streak.record}</td>
              <td>{streak.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardPage;
