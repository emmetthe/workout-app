import React, { useEffect, useState } from 'react';
import { Grid, Button, TextField, Typography, FormControlLabel, Checkbox } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createWorkout } from '../../slices/workoutThunk';
import { clearErrors } from '../../slices/errorSlice';
import { Alert, IconButton } from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  closeButton: {
    position: 'absolute',
    left: '20px',
    bottom: '20px',
    backgroundColor: '#F5F5F5',
    color: 'gray',
    '&:hover': {
      backgroundColor: '#EDEDED'
    }
  }
});

const WorkoutProgramForm = ({ handleClose }) => {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const dispatch = useDispatch();
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const error = useSelector((state) => state.errors);
  const classes = useStyles();

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
    <Grid container direction="column" alignItems="flex-end">
      <IconButton className={classes.closeButton} variant="contained" onClick={handleClose}>
        <CloseIcon />
      </IconButton>

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
    </Grid>
  );
};

export default WorkoutProgramForm;
