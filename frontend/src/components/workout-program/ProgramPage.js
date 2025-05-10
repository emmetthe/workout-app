import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWorkout, removeExercise, updateWorkout } from '../../slices/workoutThunk';
import { useLocation, useNavigate } from 'react-router-dom';
import UpdateProgramForm from './updateProgramForm';
import EditableExerciseTable from './EditableExerciseTable';
import CustomSnackbar from '../snackbar/snackbar';
import { openSnackbar } from '../../slices/snackbarSlice';
import { FaArrowLeft } from 'react-icons/fa';

const ProgramPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const currentState = location.state;
  const workout = useSelector((state) => state.programs.workouts.find((exercise) => exercise.id === currentState.id));
  const { id, name, description, days, exercises } = workout;
  const copyDays = [...days];
  const sortedDays = copyDays.sort((a, b) => a.id - b.id);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const snackbarOpen = useSelector((state) => state.snackbar.open);
  const snackbarMessage = useSelector((state) => state.snackbar.message);
  const snackbarSeverity = useSelector((state) => state.snackbar.severity);

  const handleDelete = async (exerciseId, delExercise) => {
    try {
      if (delExercise) {
        dispatch(removeExercise(id, exerciseId));
      } else {
        dispatch(deleteWorkout(id));
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

  const handleBackButton = () => {
    navigate('/dashboard');
  };

  const handleUpdateForm = () => {
    setShowUpdateForm(false);
  };

  const handleUpdate = (updatedData, updatingExercise) => {
    try {
      dispatch(updateWorkout(updatedData, id, updatingExercise));
      dispatch(openSnackbar({ message: 'Details updated successfully', severity: 'success' }));
    } catch (error) {
      console.error('Error updating workout:', error);
    }
  };

  return (
    <div className="p-4 mt-2 w-full shadow-lg dark:text-white min-h-screen">
      {showUpdateForm ? (
        <div>
          <UpdateProgramForm workout={workout} onUpdate={handleUpdate} showUpdateForm={handleUpdateForm} />
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-5">
          <button className="absolute left-20" onClick={() => handleBackButton()}>
            <FaArrowLeft className="h-6 w-6 fill-white" />
          </button>

          {/* border line between program name and details */}
          <div className="text-center mb-5 border-zinc-500 pb-2 border-b w-2/6">
            <h2 className="text-xl font-bold">{name}</h2>
          </div>

          <div className="mb-5">
            <h3 className="text-lg font-bold mb-2">Description</h3>
            <p className="text-sm dark:text-gray-light mb-3">{description}</p>
            <h3 className="text-lg font-bold mb-2">Days</h3>
            <ul>
              {sortedDays.map((day, idx) => (
                <li key={idx}>{day.dayName}</li>
              ))}
            </ul>

            <h3 className="text-lg font-bold mb-2">Exercises</h3>
            {exercises.length > 0 ? (
              <EditableExerciseTable
                exercises={exercises}
                onUpdateExercise={(updatedData) => handleUpdate(updatedData, true)}
                onDeleteExercise={(exerciseId, delExercise) => handleDelete(exerciseId, delExercise)}
              />
            ) : (
              <p>No exercises found</p>
            )}
          </div>

          <div className="mt-4 flex flex-col space-y-2">
            <button className="mb-3 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={() => setShowUpdateForm(true)}>
              Update Details
            </button>
            <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700" onClick={handleDelete}>
              Delete Workout
            </button>
          </div>
        </div>
      )}
      <CustomSnackbar open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} />
    </div>
  );
};

export default ProgramPage;
