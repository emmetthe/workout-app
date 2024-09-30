import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const AddExerciseForm = ({ handleClose, handleAddToProgram, exercise, selectedProgram, selectProgram, setSelectedProgram }) => {
  const workouts = useSelector((state) => state.programs);
  const workoutList = workouts.workouts;
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [exerciseSets, setExerciseSets] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [addingSet, setAddingSet] = useState(false);
  const [formError, setFormError] = useState('');

  const handleAddExercise = () => {
    const exerciseData = {
      ...exercise,
      sets: exerciseSets,
      programId: selectedProgram.id,
      programName: selectedProgram.name,
      target: exercise.target.Primary,
      category: exercise.Category
    };

    // check to see if exercise already in program
    const checkExerciseInProgram = () => {
      const { exercises } = selectedProgram;
      return exercises.some((ex) => ex.exercise.id === exercise.id);
    };

    if (checkExerciseInProgram()) {
      setFormError('Exercise Already In Selected Program');
    } else {
      handleAddToProgram(exerciseData, selectedProgram.id);
    }
  };

  const handleGoBack = () => {
    setSelectedProgram(null);
    setExerciseSets([]);
    setReps('');
    setWeight('');
    setFormError('');
    setShowForm(true);
    setAddingSet(false);
  };

  const handleShowForm = () => {
    setFormError('');
    setShowForm(true);
    setAddingSet(true);
  };

  const handleAddSet = () => {
    if (!reps || !weight) {
      setFormError('Please fill in all fields.');
      return;
    }

    const newSet = {
      reps: Number(reps),
      set_number: exerciseSets.length + 1,
      weight: Number(weight)
    };

    setExerciseSets([...exerciseSets, newSet]);
    setReps('');
    setWeight('');
    setFormError('');
    setShowForm(false);
    setAddingSet(false);
  };

  const handleCancelForm = () => {
    setReps('');
    setWeight('');
    setFormError('');
    setShowForm(false);
    setAddingSet(false);
  };

  const totalReps = exerciseSets.reduce((total, set) => total + set.reps, 0);

  return (
    <div className="flex flex-col items-center">
      {!selectedProgram ? (
        <div className="flex flex-col items-center p-5 space-y-4">
          <h2 className="text-2xl font-bold text-center">Select a program</h2>
          {workoutList.map((program, idx) => (
            <button
              key={idx}
              className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
              onClick={() => selectProgram(program)}
            >
              {program.name}
            </button>
          ))}
        </div>
      ) : (
        <div className="w-full p-5 space-y-4">
          <div className="flex justify-between items-center">
            <button className="text-blue-500 border border-blue-500 px-3 py-1 rounded hover:bg-blue-50" onClick={handleGoBack}>
              Change Program
            </button>
            <h2 className="text-xl font-bold">{selectedProgram.name}</h2>
          </div>

          {formError && <div className="bg-red-100 text-red-600 p-3 rounded">{formError}</div>}

          {showForm ? (
            <div className="space-y-4">
              <label className="block text-lg">Set {exerciseSets.length + 1}</label>
              <div className="space-y-2">
                <label className="block">Enter Reps:</label>
                <input type="number" className="border p-2 w-full rounded" value={reps} onChange={(e) => setReps(e.target.value)} min={1} />
              </div>
              <div className="space-y-2">
                <label className="block">Enter Weight (lbs):</label>
                <input
                  type="number"
                  className="border p-2 w-full rounded"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  min={1}
                />
              </div>

              <div className="flex space-x-4">
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={handleAddSet}>
                  Create Set
                </button>
                {exerciseSets.length > 0 && (
                  <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" onClick={handleCancelForm}>
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {exerciseSets.length > 0 && (
                <div className="border border-gray-300 rounded p-4">
                  <h3 className="text-lg font-semibold">{exercise.exercise_name}:</h3>
                  <p>Total Sets: {exerciseSets.length}</p>
                  <p>Total Reps: {totalReps}</p>
                </div>
              )}
              <button className="bg-blue-500 text-white py-2 w-full rounded hover:bg-blue-600" onClick={handleShowForm}>
                Create New Set
              </button>
            </div>
          )}

          {exerciseSets.length > 0 && !addingSet && (
            <button className="bg-green-500 text-white py-2 w-full rounded hover:bg-green-600 mt-4" onClick={handleAddExercise}>
              Add To Program
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AddExerciseForm;
