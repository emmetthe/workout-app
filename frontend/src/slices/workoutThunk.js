import { setWorkouts, setSelectedWorkout, addWorkout } from './workoutSlice';
import axios from 'axios';
import Cookies from 'js-cookie';
import { clearErrors, receiveErrors } from './errorSlice';

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
  try {
    const body = JSON.stringify(workoutData);
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
  const body = JSON.stringify({
    withCredentials: true
  });
  try {
    await axios.delete(`${API_BASE_URL}/delete/${id}/`, config, body);
  } catch (error) {
    dispatch(receiveErrors(error.message));
  }
};

export const updateWorkout = (workoutData, programId) => async (dispatch) => {
  const body = JSON.stringify(workoutData);
  dispatch(clearErrors());
  console.log('body: ', body);
  try {
    const response = await axios.put(`${API_BASE_URL}/update/${programId}/`, body, config);
    console.log('response: ', response);
    dispatch(setWorkouts([response.data]));
  } catch (error) {
    dispatch(receiveErrors(error.message));
  }
};
