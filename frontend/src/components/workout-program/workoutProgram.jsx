import React, { useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkouts } from '../../slices/workoutThunk';
import WorkoutProgramForm from './workoutProgramForm';
import { Link } from 'react-router-dom';

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
