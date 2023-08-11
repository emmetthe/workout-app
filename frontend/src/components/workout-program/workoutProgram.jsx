import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkouts, fetchSingleWorkout, createWorkout } from '../../slices/workoutThunk';
import WorkoutProgramForm from './workoutProgramForm';

const WorkoutProgram = () => {
  const { workouts } = useSelector((state) => state.workouts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, [dispatch]);

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Typography variant="h4">Workout Program</Typography>

      <WorkoutProgramForm />

      <Typography variant="h4">Your Current Workouts</Typography>
      {workouts.length === 0 ? (
        <Typography variant="subtitle1">No exercises added to the program yet.</Typography>
      ) : (
        // display workout program
        <div>
          <Typography variant="h6">Selected Exercises:</Typography>
          <ul>
            {workouts.map((workout, index) => (
              <li key={index}>
                <Typography variant="body1">{workout.name}</Typography>
                <Typography variant="body1">{workout.description}</Typography>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Grid>
  );
};

export default WorkoutProgram;
