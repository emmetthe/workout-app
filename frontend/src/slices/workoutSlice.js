import { createSlice } from '@reduxjs/toolkit';

const workoutSlice = createSlice({
  name: 'workouts',
  initialState: {
    workouts: [],
    selectedWorkout: null
  },
  reducers: {
    setWorkouts: (state, action) => {
      state.workouts = action.payload;
    },
    addWorkout: (state, action) => {
      state.workouts = [...state.workouts, action.payload];
    },
    setSelectedWorkout: (state, action) => {
      state.selectedWorkout = action.payload;
    },
    updateWorkouts: (state, action) => {
      const newWorkouts = state.workouts.map((workout) => (workout.id === action.payload.id ? action.payload : workout));
      return { ...state, workouts: newWorkouts };
    },
    resetWorkouts: (state, action) => {
      return { workouts: [], selectedWorkout: null };
    }
  }
});

export const { setWorkouts, setSelectedWorkout, addWorkout, updateWorkouts, resetWorkouts } = workoutSlice.actions;
export default workoutSlice.reducer;
