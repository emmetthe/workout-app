import React, { useEffect, useState } from 'react';
import { Grid, Button, TextField, Typography, FormControlLabel, Checkbox } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createWorkout, fetchWorkouts } from '../../slices/workoutThunk';
import { clearErrors } from '../../slices/errorSlice';
import { Alert } from '@mui/material';

const WorkoutProgramForm = ({ handleClose }) => {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const dispatch = useDispatch();
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const error = useSelector((state) => state.errors);

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  const data = {
    name: workoutName,
    description: workoutDescription,
    exercises: selectedExercises,
    days: selectedDays
  };

  const createProgram = async () => {
    dispatch(createWorkout(data, resetForm, handleClose));
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
    <Grid container direction="column" alignItems="center" spacing={2} style={{ padding: 20 }}>
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Workout Name"
        variant="outlined"
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
        fullWidth
        style={{ marginBottom: 10 }}
      />
      <TextField
        label="Workout Description"
        variant="outlined"
        value={workoutDescription}
        onChange={(e) => setWorkoutDescription(e.target.value)}
        multiline
        minRows={3}
        fullWidth
        style={{ marginBottom: 20 }}
      />

      <Typography variant="subtitle1" style={{ marginBottom: 10 }}>
        Days *
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
          <FormControlLabel
            key={day}
            control={<Checkbox checked={selectedDays.includes(day)} onChange={() => handleDayChange(day)} />}
            label={day}
            style={{ marginBottom: 5, width: '100%', display: 'block' }}
          />
        ))}
      </div>

      <Button variant="outlined" onClick={createProgram} style={{ marginTop: 20 }}>
        Create workout
      </Button>
    </Grid>
  );
};

export default WorkoutProgramForm;
