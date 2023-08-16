import React, { useState } from 'react';
import { Grid, Button, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const CloseButtonStyle = {
  p: 0,
  color: 'gray',
  minWidth: 0,
  position: 'absolute',
  right: '5px',
  top: '5px'
};

const AddExerciseForm = ({ handleClose, handleAddToProgram, exercise, selectedProgram, selectProgram, setSelectedProgram }) => {
  const workouts = useSelector((state) => state.workouts);
  const workoutList = workouts.workouts;
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [weight, setWeight] = useState('');

  const handleAddExercise = () => {
    const exerciseData = {
      ...exercise,
      reps: reps,
      sets: sets,
      weight: weight,
      programId: selectedProgram.id,
      programName: selectedProgram.name
      // Add more fields as needed
    };
    handleAddToProgram(exerciseData, selectedProgram.id);
  };

  const handleGoBack = () => {
    setSelectedProgram(null);
  };

  return (
    <Grid>
      <Button sx={CloseButtonStyle} onClick={handleClose}>
        <CloseIcon />
      </Button>
      {!selectedProgram ? (
        // Display list of workout programs
        <>
          <Typography>Select a program</Typography>
          {workoutList.map((program, idx) => (
            <Button key={idx} variant="contained" color="primary" onClick={() => selectProgram(program)}>
              {program.name}
            </Button>
          ))}
        </>
      ) : (
        // Display exercise form when a program is selected
        <>
          <Button onClick={handleGoBack}>Back</Button>
          <Typography>Enter Reps, Sets, and Weight:</Typography>
          <TextField label="Reps" value={reps} onChange={(e) => setReps(e.target.value)} variant="outlined" fullWidth margin="normal" />
          <TextField label="Sets" value={sets} onChange={(e) => setSets(e.target.value)} variant="outlined" fullWidth margin="normal" />
          <TextField
            label="Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleAddExercise}>
            Add Exercise
          </Button>
        </>
      )}
    </Grid>
  );
};

export default AddExerciseForm;
