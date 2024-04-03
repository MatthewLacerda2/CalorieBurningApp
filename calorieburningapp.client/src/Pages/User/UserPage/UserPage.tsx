import React, { useEffect, useState } from "react";
import SideBar from "../../../Components/SideBar/SideBar";
import Expandable from "../../../Components/Expandable/Expandable";
import Card from "../../../Components/Card/Card";
import ExerciseFormulary from "../../../Components/ExerciseEntry/ExerciseFormulary";
import Button from "../../../Components/Button/Button";
import "./UserPage.css";
import { UserDTO } from "../../../Data/UserDTO";
import { getUserFromToken } from "../../../Utils/getUserFromToken";
import axios from "axios";
import { ExerciseEntry } from "../../../Data/ExerciseEntry";

const UserPage: React.FC = () => {
  const [entries, setEntries] = useState<ExerciseEntry[]>([]);
  const funcao = () => {
    console.log("debug");
  };

  const calWarning: string = `Reach 300cal to mark a streak for the day!`;
  const streakInfo: string = `Current Streak: 0 Longest Streak: 0`;
  const totalCals: string = `Total calories Burnt: 0`;

  const user: UserDTO = getUserFromToken();

  const filter: GETEntriesFilter = {
    datetimeMin: undefined,
    datetimeMax: undefined,
    userId: user!.id,
    title: undefined,
    burnedCaloriesMin: undefined,
    burnedCaloriesMax: undefined,
    offset: 0,
    limit: 10,
    sort: "datetime",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "http://localhost:5071/api/v1/entries/";

        filter.userId = user?.id;

        // Construct the query string based on the filter parameters
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
  }, []); // Empty de

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
              children={[<Button text="X" onClick={funcao} />]}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default UserPage;
