import EExercise from './EExercise';
import { User } from './User';

export interface ExerciseEntry {
    userId: string;
    user?: User;
    id: string;
    exercise: EExercise;
    dateTime: Date;
    title?: string;
    burnedCalories: number;
}