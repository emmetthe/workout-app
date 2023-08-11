import React, { useState } from 'react';
import { Grid, Button, TextField, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createWorkout } from '../../slices/workoutThunk';

const WorkoutProgramForm = () => {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const dispatch = useDispatch();
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');

  const resetForm = () => {
    setWorkoutName('');
    setWorkoutDescription('');
    setSelectedExercises([]);
  };

  const createProgram = () => {
    const data = {
      name: workoutName,
      description: workoutDescription,
      exercises: selectedExercises
    };
    dispatch(createWorkout(data, resetForm));
  };

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      {/* possibly add search option to add exercises? */}

      <TextField label="Workout Name" variant="outlined" value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} />
      <TextField
        label="Workout Description"
        variant="outlined"
        value={workoutDescription}
        onChange={(e) => setWorkoutDescription(e.target.value)}
        multiline
        minRows={3}
      />

      {/* add checkbox of days to run workout */}
      <Typography>Day *</Typography>

      <Button variant="outlined" onClick={createProgram}>
        Create workout
      </Button>
    </Grid>
  );
};

export default WorkoutProgramForm;
