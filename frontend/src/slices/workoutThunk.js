import { setWorkouts, setSelectedWorkout, addWorkout, updateWorkouts } from './workoutSlice';
import axios from 'axios';
import Cookies from 'js-cookie';
import { clearErrors, receiveErrors } from './errorSlice';

const API_BASE_URL = '/workout_program';

export const fetchWorkouts = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/workouts/`);
    dispatch(setWorkouts(response.data));
  } catch (error) {
    dispatch(receiveErrors(error.message));
  }
};

export const fetchSingleWorkout = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/workout/${id}/`);
    dispatch(setSelectedWorkout(response.data));
  } catch (error) {
    dispatch(receiveErrors(error.message));
  }
};

export const createWorkout = (workoutData, resetForm, handleClose) => async (dispatch) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken')
    }
  };
  const body = JSON.stringify(workoutData);

  try {
    const response = await axios.post(`${API_BASE_URL}/create/`, body, config);
    dispatch(clearErrors());

    if (response.data.success) {
      dispatch(addWorkout(response.data));
      resetForm();
      handleClose();
    } else {
      dispatch(receiveErrors(response.data.error));
    }
  } catch (error) {
    dispatch(receiveErrors(error.message));
  }
};

export const deleteWorkout = (id) => async (dispatch) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken')
    }
  };
  const body = JSON.stringify({
    withCredentials: true
  });

  try {
    await axios.delete(`${API_BASE_URL}/delete/${id}/`, config, body);
  } catch (error) {
    dispatch(receiveErrors(error.message));
  }
};

export const updateWorkout = (workoutData, programId, updatingExercise) => async (dispatch) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken')
    }
  };
  const body = JSON.stringify(workoutData);
  dispatch(clearErrors());
  try {
    let response;
    if (updatingExercise === true) {
      response = await axios.put(`${API_BASE_URL}/update-exercise/${programId}/`, body, config);
    } else {
      response = await axios.put(`${API_BASE_URL}/update/${programId}/`, body, config);
    }
    dispatch(updateWorkouts(response.data));
  } catch (error) {
    dispatch(receiveErrors(error.message));
  }
};

export const removeExercise = (programId, ExerciseInProgramId) => async (dispatch) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken')
    }
  };

  try {
    await axios.delete(`${API_BASE_URL}/delete_exercise/${programId}/${ExerciseInProgramId}/`, config);
    dispatch(fetchWorkouts());
  } catch (error) {
    dispatch(receiveErrors(error.message));
  }
};
