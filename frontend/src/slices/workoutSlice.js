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
    }
  }
});

export const { setWorkouts, setSelectedWorkout, addWorkout } = workoutSlice.actions;
export default workoutSlice.reducer;
