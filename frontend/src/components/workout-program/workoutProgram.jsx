import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkouts } from '../../slices/workoutThunk';
import WorkoutProgramForm from './createProgramForm';
import { Link } from 'react-router-dom';
import ModalForm from '../modal/modal';

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px'
  },
  header: {
    marginBottom: '20px'
  },
  addButton: {
    marginBottom: '20px'
  },
  noWorkouts: {
    margin: '20px'
  },
  workoutItem: {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '5px',
    textDecoration: 'none',
    color: 'black',
    transition: 'background-color 0.2s, color 0.2s',
    '&:hover': {
      backgroundColor: '#e0e0e0',
      color: 'blue',
      transform: 'scale(1.02)'
    }
  }
};

const WorkoutProgram = () => {
  const { workouts } = useSelector((state) => state.programs);
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
    <Grid container direction="column" alignItems="center" style={styles.container}>
      <Typography variant="h4" style={styles.header}>
        Workout Program
      </Typography>

      <Button variant="outlined" onClick={openModal} style={styles.addButton}>
        Create New Program
      </Button>
      <ModalForm componentForm={<WorkoutProgramForm handleClose={closeModal} />} modalState={modalOpen} handleClose={closeModal} />

      <Typography variant="h4">Your Current Workouts</Typography>
      {workouts.length === 0 ? (
        <Typography variant="subtitle1" style={styles.noWorkouts}>
          No exercises added to the program yet.
        </Typography>
      ) : (
        <Grid container direction="column" alignItems="center">
          {workouts.map((workout, index) => (
            <Link key={index} state={workout} to={{ pathname: `/workouts/${workout.id}` }} style={styles.workoutItem}>
              <Typography variant="h6">{workout.name}</Typography>
              <Typography>{workout.description}</Typography>
            </Link>
          ))}
        </Grid>
      )}
    </Grid>
  );
};

export default WorkoutProgram;
