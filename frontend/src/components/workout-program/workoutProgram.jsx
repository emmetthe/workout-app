import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkouts } from '../../slices/workoutThunk';
import WorkoutProgramForm from './createProgramForm';
import { Link } from 'react-router-dom';
import ModalForm from '../modal/modal';

const WorkoutProgram = () => {
  const { workouts } = useSelector((state) => state.workouts);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, [dispatch, modalOpen]);

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Typography variant="h4">Workout Program</Typography>

      <Button variant="outlined" onClick={openModal}>
        Create New Program
      </Button>
      <ModalForm componentForm={<WorkoutProgramForm handleClose={closeModal} />} modalState={modalOpen} handleClose={closeModal} />

      <Typography variant="h4">Your Current Workouts</Typography>
      {workouts.length === 0 ? (
        <Typography variant="subtitle1">No exercises added to the program yet.</Typography>
      ) : (
        // display workout program
        <div>
          <Typography variant="h6">Selected Exercises:</Typography>
          <ul>
            {workouts.map((workout, index) => (
              <Link key={index} state={workout} to={{ pathname: `/workouts/${workout.id}` }}>
                <Typography>{workout.name}</Typography>
                <Typography>{workout.description}</Typography>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </Grid>
  );
};

export default WorkoutProgram;
