import EExercise from "./EExercise";

interface ExerciseEntry {
    userId: string;
    id: string;
    exercise: EExercise;
    dateTime: Date;
    title: string;
    burnedCalories: number;
}

export default ExerciseEntry;