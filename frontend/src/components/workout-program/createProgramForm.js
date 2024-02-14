import React, { useState } from 'react';
import { Grid, Box, Button, TextField, Typography, FormControlLabel, CircularProgress } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createWorkout } from '../../slices/workoutThunk';
import { Alert, IconButton } from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';
import Checkbox from '@mui/material/Checkbox';

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
  },
  centeredContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    textAlign: 'center'
  },
  centeredLabel: {
    marginRight: '20%'
  },
  createButton: {
    marginTop: 20,
    backgroundColor: '#1976d2',
    color: 'white',
    '&:hover': {
      backgroundColor: '#1565c0'
    }
  },
  parentFormContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  daysOfWeekContainer: {
    alignItems: 'center'
  }
});

const WorkoutProgramForm = ({ handleClose }) => {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const dispatch = useDispatch();
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  // const errors = useSelector((state) => state.errors);
  const [error, setError] = useState('');
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const openLoader = () => {
    setLoading(true);
  };

  const closeLoader = () => {
    setLoading(false);
  };

  const data = {
    name: workoutName,
    description: workoutDescription,
    exercises: selectedExercises,
    days: selectedDays
  };

  const createProgram = async () => {
    if (data.name.length <= 0) {
      setError('You must have a name for the workout');
    } else {
      openLoader();
      dispatch(createWorkout(data, resetForm, handleClose)).then(() => {
        closeLoader();
      });
    }
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

      <Box className={classes.parentFormContainer}>
        {error && <Alert severity="error">{error}</Alert>}

        {/* start spinner when calling createworkout api */}
        {loading && <CircularProgress color="inherit" style={{ marginTop: '10px' }} />}

        <Grid container direction="column" className={classes.centeredContainer}>
          <TextField
            label="Workout Name"
            variant="outlined"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            fullWidth
            style={{ marginBottom: 10 }}
            disabled={loading}
            required
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
            disabled={loading}
          />

          <Typography variant="subtitle1" style={{ marginBottom: 10 }}>
            Days
          </Typography>

          <Grid className={classes.daysOfWeekContainer}>
            <Grid container direction="column">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                <FormControlLabel
                  key={day}
                  control={<Checkbox checked={selectedDays.includes(day)} onChange={() => handleDayChange(day)} />}
                  label={day}
                  labelPlacement="start"
                  className={classes.centeredLabel}
                  disabled={loading}
                />
              ))}
            </Grid>
          </Grid>

          <Button variant="contained" onClick={createProgram} className={classes.createButton} disabled={loading}>
            Create workout
          </Button>
        </Grid>
      </Box>
    </Grid>
  );
};

export default WorkoutProgramForm;
