import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkouts } from '../../slices/workoutThunk';
import WorkoutProgramForm from './createProgramForm';
import { Link } from 'react-router-dom';
import ModalForm from '../modal/modal';
import { clearErrors } from '../../slices/errorSlice';

const WorkoutProgram = () => {
  const { workouts } = useSelector((state) => state.programs);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    dispatch(clearErrors());
  };

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, [dispatch, modalOpen]);

  return (
    <div className="text-center p-5">
      {/* <h4 className="mb-5 text-4xl font-semibold text-gray-100">Workout Program</h4> */}

      <button className="mb-5 px-3 py-2 bg-primary text-white rounded hover:bg-opacity-80" onClick={openModal}>
        Create Program
      </button>

      <ModalForm componentForm={<WorkoutProgramForm handleClose={closeModal} />} modalState={modalOpen} handleClose={closeModal} />

      <h4 className="text-2xl font-semibold text-gray-100">Your Current Workouts</h4>
      {workouts.length === 0 ? (
        <p className="text-lg text-gray-100 mt-5">No exercises added to the program yet.</p>
      ) : (
        <div className="flex flex-col items-center">
          {workouts.map((workout, index) => (
            <Link
              key={index}
              state={workout}
              to={{ pathname: `/workouts/${workout.id}` }}
              className="mb-2 p-2 rounded text-gray-light hover:text-gray-400"
            >
              <h6 className="text-xl font-semibold">{workout.name}</h6>
              <p>{workout.description}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkoutProgram;
