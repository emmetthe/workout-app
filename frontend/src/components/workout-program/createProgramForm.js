import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createWorkout } from '../../slices/workoutThunk';
import Spinner from '../spinner/spinner';

const WorkoutProgramForm = ({ handleClose }) => {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const dispatch = useDispatch();
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const openLoader = () => {
    setLoading(true);
  };

  const closeLoader = () => {
    setLoading(false);
  };

  const data = {
    name: workoutName,
    description: workoutDescription,
    exercises: selectedExercises,
    days: selectedDays
  };

  const createProgram = async () => {
    if (data.name.length <= 0) {
      setError('You must have a name for the workout');
    } else {
      openLoader();
      dispatch(createWorkout(data, resetForm, handleClose)).then(() => {
        closeLoader();
      });
    }
  };

  const resetForm = () => {
    setWorkoutDescription('');
    setWorkoutName('');
    setSelectedDays([]);
    setSelectedExercises([]);
  };

  const handleDayChange = (day) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day) ? prevSelectedDays.filter((d) => d !== day) : [...prevSelectedDays, day]
    );
  };

  return (
    <div className="flex flex-col items-end">
      {/* Close button can be added here if needed */}

      <div className="flex flex-col items-center">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {loading && <Spinner />}

        <div className="flex flex-col items-center p-5 text-center">
          <input
            type="text"
            placeholder="Workout Name"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            className="w-full mb-2 p-2 border rounded disabled:bg-gray-100"
            disabled={loading}
            required
          />
          <textarea
            placeholder="Workout Description"
            value={workoutDescription}
            onChange={(e) => setWorkoutDescription(e.target.value)}
            className="w-full mb-4 p-2 border rounded disabled:bg-gray-100"
            disabled={loading}
          />

          <p className="mb-2 text-lg">Workout Frequency</p>

          <div className="flex flex-col items-start">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <label key={day} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  checked={selectedDays.includes(day)}
                  onChange={() => handleDayChange(day)}
                  className="form-checkbox h-5 w-5 text-blue-600 hover:cursor-pointer"
                  disabled={loading}
                />
                <span className="ml-2">{day}</span>
              </label>
            ))}
          </div>

          <button
            onClick={createProgram}
            className="mt-5 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
            disabled={loading}
          >
            Create workout
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutProgramForm;
