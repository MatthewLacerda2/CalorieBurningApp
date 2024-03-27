import React, { useState, useEffect } from "react";
import axios from "axios";
import { ExerciseEntry } from "../../Data/ExerciseEntry";
import EExercise from "../../Data/EExercise";
import Card from "../Card/Card";

interface ExerciseFormProps {
  exerciseEntry?: ExerciseEntry;
}

const ExerciseFormulary: React.FC<ExerciseFormProps> = ({ exerciseEntry }) => {
  const [exerciseData, setExerciseData] = useState<ExerciseEntry>({
    userId: "",
    Id: "",
    exercise: EExercise.walking,
    dateTime: new Date(),
    title: "",
    burnedCalories: 0,
  });

  useEffect(() => {
    if (exerciseEntry) {
      setExerciseData(exerciseEntry);
    }
  }, [exerciseEntry]);

  const handleRequest = async () => {
    try {
      const url = exerciseEntry
        ? `http://localhost:5071/api/v1/entries/${exerciseEntry.Id}`
        : "http://localhost:5071/api/v1/entries";
      const method = exerciseEntry ? "PUT" : "POST";

      await axios({
        method: method,
        url: url,
        data: exerciseData,
      });
    } catch (error) {
      console.error("Error occurred:", error);
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
            onChange={handleInputChange}
          >
            <option value={EExercise.walking}>Walking</option>
            <option value={EExercise.cycling}>Cycling</option>
            <option value={EExercise.swimming}>Swimming</option>
            <option value={EExercise.cardio}>Cardio</option>
          </select>
        </label>
        <label>
          Date & Time:
          <input
            name="dateTime"
            type="datetime-local"
            value={exerciseData.dateTime.toISOString().substring(0, 16)}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Title:
          <input
            name="title"
            type="text"
            value={exerciseData.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Burned Calories:
          <input
            name="burnedCalories"
            type="number"
            value={exerciseData.burnedCalories}
            onChange={handleInputChange}
          />
        </label>
        <button className="send-button" onClick={handleRequest}>
          Send
        </button>
      </div>
    </Card>
  );
};

export default ExerciseFormulary;
