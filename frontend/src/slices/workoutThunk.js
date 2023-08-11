import { setWorkouts, setSelectedWorkout } from './workoutSlice';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const API_BASE_URL = '/workout_program';

const config = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': Cookies.get('csrftoken')
  }
};

export const fetchWorkouts = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/workouts/`);
    dispatch(setWorkouts(response.data));
  } catch (error) {
    // Handle error
  }
};

export const fetchSingleWorkout = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/workout/${id}/`);
    dispatch(setSelectedWorkout(response.data));
  } catch (error) {
    // Handle error
  }
};

export const createWorkout = (workoutData, resetForm) => async (dispatch) => {
  try {
    // const workouts = useSelector((state) => state.workouts.workoutPrograms);
    const body = JSON.stringify(workoutData);
    const response = await axios.post(`${API_BASE_URL}/create/`, body, config);
    console.log(response);
    dispatch(setWorkouts([response.data])); // Assuming response.data is the created workout
    resetForm(); // Reset the form inputs after successful creation
  } catch (error) {
    // Handle error
  }
};

// Similarly, create thunks for update and delete operations
