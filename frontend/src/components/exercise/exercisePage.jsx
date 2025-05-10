import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateWorkout } from '../../slices/workoutThunk';
import AddExerciseForm from './addExerciseForm';
import ModalForm from '../modal/modal';
import { openSnackbar } from '../../slices/snackbarSlice';
import CustomSnackbar from '../snackbar/snackbar';

const ExercisePage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const exercise = location.state;
  const { videoURL, steps, target, exercise_name, Category, Difficulty } = exercise;
  const { Primary, Secondary } = target;
  const targetMuscles = [...(Primary || []), ...(Secondary || [])];
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  // snackbar state
  const snackbarOpen = useSelector((state) => state.snackbar.open);
  const snackbarMessage = useSelector((state) => state.snackbar.message);
  const snackbarSeverity = useSelector((state) => state.snackbar.severity);

  // create refs object to store video refs
  const videoRefs = useRef({});

  // Pause all videos on page load
  useEffect(() => {
    Object.values(videoRefs.current).forEach((video) => {
      if (video) {
        video.pause(); // Ensure all videos are paused when the page loads
      }
    });
  }, []);

  const handleAddToProgram = (exerciseData, programId) => {
    // Dispatch an action to update the workout program in the Redux store
    dispatch(updateWorkout(exerciseData, programId, true));
    setSelectedProgram(null);
    closeModal();
    // add snackbar notification for users
    dispatch(openSnackbar({ message: 'Exercise added to program', severity: 'success' }));
  };

  const openModal = () => {
    setSelectedProgram(null);
    setModalOpen(true);
  };

  const selectProgram = (program) => {
    setSelectedProgram(program);
  };

  const closeModal = () => {
    setSelectedProgram(null);
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center my-12 px-24">
      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={openModal}>
        Add to Workout Program
      </button>

      <ModalForm
        componentForm={
          <AddExerciseForm
            handleClose={closeModal}
            handleAddToProgram={handleAddToProgram}
            exercise={exercise}
            selectedProgram={selectedProgram}
            selectProgram={selectProgram}
            setSelectedProgram={setSelectedProgram}
          />
        }
        modalState={modalOpen}
        handleClose={closeModal}
      />

      {/* exercise details */}
      <div className="text-center text-white my-6">
        <h2 className="text-3xl font-bold my-2">{exercise_name}</h2>
        <div className="flex flex-col items-center">
          <p className="text-lg">{Difficulty ? `Difficulty: ${Difficulty}` : 'Difficulty: N/A'}</p>
          <p className="text-lg">Type: {Category}</p>
          {targetMuscles.length > 0 && (
            <p className="text-lg">
              Muscles Targeted: {targetMuscles.map((muscle, i) => muscle + `${i !== targetMuscles.length - 1 ? ', ' : ''}`)}
            </p>
          )}
        </div>

        <h3 className="text-xl font-semibold my-4">Instructions:</h3>
        <ol className="list-decimal list-outside text-lg space-y-2">
          {steps.map((step, i) => (
            <li key={i} className="flex">
              <span className="mr-2">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* video player */}
      <div className="flex flex-col items-center space-y-4 w-full">
        {videoURL.map((url, index) => (
          <div key={index} className="w-full flex justify-center">
            <video ref={(el) => (videoRefs.current[url] = el)} className="w-full max-w-xl" controls>
              <source src={url} />
            </video>
          </div>
        ))}
      </div>

      <CustomSnackbar open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} />
    </div>
  );
};

export default ExercisePage;
