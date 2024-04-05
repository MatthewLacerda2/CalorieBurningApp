import React, { useEffect, useState } from "react";
import "./UserPage.css";
import { UserDTO } from "../../../Data/UserDTO";
import { getUserFromToken } from "../../../Utils/getUserFromToken";
import axios from "axios";
import { ExerciseEntry } from "../../../Data/ExerciseEntry";
import { Streak } from "../../../Data/Streak";
import SideBar from "../../../Components/SideBar/SideBar";
import ExerciseFormulary from "../../../Components/ExerciseEntry/ExerciseFormulary";
import Expandable from "../../../Components/Expandable/Expandable";
import Card from "../../../Components/Card/Card";

const UserPage: React.FC = () => {
  const [entries, setEntries] = useState<ExerciseEntry[]>([]);
  const [currStreak, setCurStreak] = useState(0);
  const [recordStreak, setRecordStreak] = useState(0);

  const user: UserDTO = getUserFromToken();

  const calWarning: string = `Reach 300cal to mark a streak for the day!`;
  const streakInfo: string = `Current Streak: ${currStreak} | Record Streak: ${recordStreak}`;
  const totalCals: string = `Total calories Burnt: ${user.burnedCalories}`;

  const filter: GETEntriesFilter = {
    datetimeMin: undefined,
    datetimeMax: undefined,
    userId: user!.Id,
    title: undefined,
    burnedCaloriesMin: undefined,
    burnedCaloriesMax: undefined,
    offset: 0,
    limit: 10,
    sort: "datetimeDesc",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://localhost:5071/api/v1/streaks/${user?.Id}`;
        console.log(`http://localhost:5071/api/v1/streaks/${user?.Id}`);

        const response = await axios.get(url);

        const userStreak: Streak = response.data;

        setCurStreak(userStreak.count);
        setRecordStreak(userStreak.record);
      } catch (error) {
        console.error("Error fetching streak:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "http://localhost:5071/api/v1/entries/";

        filter.userId = user?.Id;

        let queryString = Object.keys(filter)
          .map((key) =>
            filter[key as keyof GETEntriesFilter] !== undefined
              ? `${key}=${filter[key as keyof GETEntriesFilter]}`
              : ""
          )
          .filter(Boolean)
          .join("&");

        if (queryString) {
          url += `?${queryString}`;
        }

        const response = await axios.get(url);

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
  }, []);

  return (
    <div className="user-page">
      <SideBar />

      <div className="cards-container">
        <Card
          title="Username"
          items={[calWarning, streakInfo, totalCals]}
          children={<ExerciseFormulary />}
        />
      </div>
      <Card title="Latest entries">
        <div className="expandables-container">
          {entries.map((entry) => (
            <Expandable
              key={entry.Id}
              headline={entry.title!}
              content={[
                `Date & Time: ${entry.dateTime.toLocaleString()}`,
                `Exercise: ${entry.exercise}`,
                `Burned Calories: ${entry.burnedCalories}`,
              ]}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default UserPage;
