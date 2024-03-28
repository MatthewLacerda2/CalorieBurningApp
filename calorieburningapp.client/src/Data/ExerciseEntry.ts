import EExercise from './EExercise';

export interface ExerciseEntry {
    Id: string;
    userId: string;
    exercise: EExercise;
    dateTime: Date;
    title?: string;
    burnedCalories: number;
}