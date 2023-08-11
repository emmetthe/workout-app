import React, { useState } from 'react';
import { Grid, Button, TextField, Typography, FormControlLabel, Checkbox } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createWorkout } from '../../slices/workoutThunk';

const WorkoutProgramForm = () => {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const dispatch = useDispatch();
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);

  const resetForm = () => {
    setWorkoutName('');
    setWorkoutDescription('');
    setSelectedExercises([]);
    setSelectedDays([]);
  };

  const createProgram = () => {
    const data = {
      name: workoutName,
      description: workoutDescription,
      exercises: selectedExercises,
      days: selectedDays
    };
    dispatch(createWorkout(data, resetForm));
  };

  const handleDayChange = (day) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day) ? prevSelectedDays.filter((d) => d !== day) : [...prevSelectedDays, day]
    );
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

      {/*Checkboxes for each day */}
      <Typography>Days *</Typography>
      <FormControlLabel
        control={<Checkbox checked={selectedDays.includes('Monday')} onChange={() => handleDayChange('Monday')} />}
        label="Monday"
      />
      <FormControlLabel
        control={<Checkbox checked={selectedDays.includes('Tuesday')} onChange={() => handleDayChange('Tuesday')} />}
        label="Tuesday"
      />
      <FormControlLabel
        control={<Checkbox checked={selectedDays.includes('Wednesday')} onChange={() => handleDayChange('Wednesday')} />}
        label="Wednesday"
      />
      <FormControlLabel
        control={<Checkbox checked={selectedDays.includes('Thursday')} onChange={() => handleDayChange('Thursday')} />}
        label="Thursday"
      />
      <FormControlLabel
        control={<Checkbox checked={selectedDays.includes('Friday')} onChange={() => handleDayChange('Friday')} />}
        label="Friday"
      />
      <FormControlLabel
        control={<Checkbox checked={selectedDays.includes('Saturday')} onChange={() => handleDayChange('Saturday')} />}
        label="Saturday"
      />
      <FormControlLabel
        control={<Checkbox checked={selectedDays.includes('Sunday')} onChange={() => handleDayChange('Sunday')} />}
        label="Sunday"
      />

      <Button variant="outlined" onClick={createProgram}>
        Create workout
      </Button>
    </Grid>
  );
};

export default WorkoutProgramForm;
