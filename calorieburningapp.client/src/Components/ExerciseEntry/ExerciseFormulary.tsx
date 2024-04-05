import React, { useState, useEffect } from "react";
import axios from "axios";
import { ExerciseEntry } from "../../Data/ExerciseEntry";
import EExercise from "../../Data/EExercise";
import Card from "../Card/Card";
import { getUserFromToken } from "../../Utils/getUserFromToken";
import "../../Styles/FormularyStyle.css";

interface ExerciseFormProps {
  exerciseEntry?: ExerciseEntry;
}

const ExerciseFormulary: React.FC<ExerciseFormProps> = ({ exerciseEntry }) => {
  const [exerciseData, setExerciseData] = useState<ExerciseEntry>({
    userId: "",
    Id: "",
    exercise: EExercise.walking,
    dateTime: new Date(2020, 1, 1, 13, 0, 0, 0),
    title: "",
    burnedCalories: 0,
  });

  exerciseData.userId = getUserFromToken()!.Id;
  console.log(exerciseData.dateTime);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = getUserFromToken();
      if (user) {
        setExerciseData((prevData) => ({ ...prevData, userId: user.Id }));
      }
    };

    fetchUserData();

    if (exerciseEntry) {
      setExerciseData(exerciseEntry);
    }
  }, [exerciseEntry]);

  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const newValue = new Date(event.target.value).toISOString();
    setExerciseData((prevData) => ({ ...prevData, [field]: newValue }));
  };

  const handleRequest = async () => {
    const userid: string | undefined = getUserFromToken()?.Id;
    console.log(userid);
    console.log(exerciseEntry);
    try {
      const url = exerciseEntry
        ? `http://localhost:5071/api/v1/entries/?Id=${userid}`
        : "http://localhost:5071/api/v1/entries/";
      const method = exerciseEntry ? "PUT" : "POST";

      await axios({
        method: method,
        url: url,
        data: exerciseData,
      });
    } catch (error) {
      console.error("Error occurred:xxxx", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setExerciseData({ ...exerciseData, [name]: value });
  };

  return (
    <Card title={exerciseEntry ? "Edit Exercise Entry" : "Add Exercise Entry"}>
      <div className="exercise-form">
        <label>
          Exercise Type:
          <select
            name="exercise"
            value={exerciseData.exercise}
            onChange={handleInputChange}>
            <option value={EExercise.walking}>Walking</option>
            <option value={EExercise.cycling}>Cycling</option>
            <option value={EExercise.swimming}>Swimming</option>
            <option value={EExercise.cardio}>Cardio</option>
          </select>
        </label>
        <br></br>
        <label>
          Date & Time:
          <input
            className="input-text"
            name="dateTime"
            type="datetime-local"
            value={exerciseData.dateTime?.toISOString().slice(0, -16) ?? ""}
            onChange={(e) => handleDateChange(e, "dateTime")}
          />
        </label>
        <br></br>
        <label>
          Title:
          <input
            className="input-text"
            name="title"
            type="text"
            value={exerciseData.title}
            onChange={handleInputChange}
          />
        </label>
        <br></br>
        <label>
          Burned Calories:
          <input
            className="input-text"
            style={{ height: "15px" }}
            name="burnedCalories"
            type="number"
            value={exerciseData.burnedCalories}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button className="send-button" onClick={handleRequest}>
          Send
        </button>
      </div>
    </Card>
  );
};

export default ExerciseFormulary;
