import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateWorkout } from '../../slices/workoutThunk';
import { openSnackbar } from '../../slices/snackbarSlice';

const EditExercisePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { exercise } = location.state;
  const { program } = exercise;
  const [editedSets, setEditedSets] = useState([...exercise.sets]);
  const [error, setError] = useState('');

  const handleInputChange = (index, field, value) => {
    const updatedSets = [...editedSets];
    updatedSets[index][field] = value;
    setEditedSets(updatedSets);
  };

  const handleDeleteSet = (index) => {
    setEditedSets((prevArray) => {
      return [...prevArray.slice(0, index), ...prevArray.slice(index + 1)];
    });
  };

  const handleUpdateClick = () => {
    if (validateFields()) {
      const newExerciseData = { ...exercise, sets: editedSets };
      console.log('new', editedSets);
      dispatch(updateWorkout(newExerciseData, program, true))
        .then(() => {
          dispatch(openSnackbar({ message: 'Exercise updated successfully', severity: 'success' }));
          navigate(-1); // Navigate back to the previous page after dispatch is successful
        })
        .catch((error) => {
          console.error('Error updating workout:', error);
          dispatch(openSnackbar({ message: 'Error updating exercise', severity: 'error' }));
        });
    } else {
      setError('Please fill out all Reps and Weight fields');
    }
  };

  const handleCancelClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleAddSetClick = () => {
    // Create a new empty set and add it to the list of edited sets
    const newSet = {
      setNumber: exercise.sets.length + 1,
      reps: '',
      weight: '',
      exerciseId: exercise.exercise.id
    };
    setEditedSets([...editedSets, newSet]);
  };

  const validateFields = () => {
    // Check if all sets have both reps and weight filled out
    return editedSets.every((set) => set.reps !== '' && set.weight !== '');
  };

  return (
    <div className="flex flex-col items-center mt-12 text-white px-4 min-h-screen">
      <div className=" max-w-lg">
        <h4 className="text-2xl font-semibold border-b pb-2 mb-6">Edit Sets</h4>

        <h5 className="text-xl mb-5">{exercise.exercise.exerciseName}</h5>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        {/* labels */}
        <div className="grid grid-cols-12 gap-4 mb-2">
          <div className="col-span-2 flex justify-start items-center">
            <span className="text-lg">Set</span>
          </div>
          <div className="col-span-4 flex justify-center items-center">
            <span className="text-lg">Reps</span>
          </div>
          <div className="col-span-4 flex justify-center items-center">
            <span className="text-lg">Weight (lbs)</span>
          </div>
        </div>

        {editedSets.map((set, index) => (
          <div className="grid grid-cols-12 gap-4 mb-2 text-black items-center" key={index}>
            {/* rep number */}
            <div className="col-span-2 text-white">
              <span className="text-lg">{index + 1}</span>
            </div>
            <div className="col-span-4">
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={set.reps}
                onChange={(e) => handleInputChange(index, 'reps', Number(e.target.value))}
              />
            </div>

            {/* weight value */}
            <div className="col-span-4">
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={set.weight}
                onChange={(e) => handleInputChange(index, 'weight', Number(e.target.value))}
              />
            </div>

            {/* delete button */}
            <div>
              <button
                class="flex justify-center items-center w-9 h-9 rounded-full text-white focus:outline-none bg-red-500 hover:bg-red-600"
                onClick={(e) => handleDeleteSet(index)}
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-width="2" d="M20 12H4"></path>
                </svg>
              </button>
            </div>
          </div>
        ))}

        {/* Centered Plus Button */}
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-600 text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-700"
            onClick={handleAddSetClick}
          >
            +
          </button>
        </div>

        {/* Centered Update and Cancel Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700" onClick={handleUpdateClick}>
            Update
          </button>
          <button className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditExercisePage;
