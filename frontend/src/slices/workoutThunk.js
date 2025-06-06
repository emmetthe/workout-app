import { setWorkouts, setSelectedWorkout, addWorkout, updateWorkouts } from './workoutSlice';
import { clearErrors, receiveErrors } from './errorSlice';
import axiosInstance from '../utils/axiosInstance';

const API_BASE_URL = 'workout_program';

export const fetchWorkouts = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/${API_BASE_URL}/workouts/`);
    dispatch(setWorkouts(response.data));
  } catch (error) {
    // dispatch(receiveErrors(error.message));
  }
};

export const fetchSingleWorkout = (id) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/${API_BASE_URL}/workout/${id}/`);
    dispatch(setSelectedWorkout(response.data));
  } catch (error) {
    dispatch(receiveErrors(error.message));
  }
};

export const createWorkout = (workoutData, resetForm, handleClose) => async (dispatch) => {
  const body = workoutData;

  try {
    const response = await axiosInstance.post(`/${API_BASE_URL}/create/`, body);
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

// Delete a workout program from the program page by its ID
export const deleteWorkout = (id) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/${API_BASE_URL}/delete/${id}/`);
  } catch (error) {
    dispatch(receiveErrors(error.message));
  }
};

export const updateWorkout = (workoutData, programId, updatingExercise) => async (dispatch) => {
  const body = workoutData;
  dispatch(clearErrors());
  try {
    let response;
    // determine the endpoint based on whether we're updating an exercise or the program itself
    if (updatingExercise === true) {
      // If updating an exercise, use the update-exercise endpoint
      response = await axiosInstance.put(`/${API_BASE_URL}/update-exercise/${programId}/`, body);
    } else {
      // If updating the program itself, use the update endpoint
      response = await axiosInstance.put(`/${API_BASE_URL}/update/${programId}/`, body);
    }
    dispatch(updateWorkouts(response.data));
  } catch (error) {
    dispatch(receiveErrors(error.message));
  }
};

// Remove an exercise from the workout program by its ID
export const removeExercise = (programId, ExerciseInProgramId) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/${API_BASE_URL}/delete_exercise/${programId}/${ExerciseInProgramId}/`);
    dispatch(fetchWorkouts());
  } catch (error) {
    dispatch(receiveErrors(error.message));
  }
};
