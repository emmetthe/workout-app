import React, { useState } from 'react';
import { Grid, Button, TextField, InputAdornment } from '@mui/material';
import { useSelector } from 'react-redux';
import { Typography, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  closeButton: {
    position: 'absolute',
    right: '5px',
    top: '5px',
    backgroundColor: '#F5F5F5',
    color: 'gray',
    '&:hover': {
      backgroundColor: '#EDEDED'
    }
  }
});

const styles = {
  // closeButton: {
  //   position: 'absolute',
  //   right: '5px',
  //   top: '5px',
  //   backgroundColor: '#F5F5F5',
  //   color: 'gray'
  // },
  backButton: {
    marginLeft: '5px',
    position: 'absolute',
    left: '5px',
    top: '7px'
  },
  title: {
    fontSize: '24px',
    marginBottom: '16px',
    textAlign: 'center'
  },
  label: {
    fontSize: '16px',
    marginBottom: '8px'
  },
  textField: {
    marginBottom: '16px'
  },
  addButton: {
    marginTop: '20px'
  },
  programNameContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px'
  },
  workoutListButton: {
    marginBottom: '10px',
    width: '100%'
  },
  commonFormStyles: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    minWidth: '250px',
    minHeight: '200px'
  }
};

const AddExerciseForm = ({ handleClose, handleAddToProgram, exercise, selectedProgram, selectProgram, setSelectedProgram }) => {
  const workouts = useSelector((state) => state.programs);
  const workoutList = workouts.workouts;
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [weight, setWeight] = useState('');
  const classes = useStyles();

  const handleAddExercise = () => {
    const exerciseData = {
      ...exercise,
      reps: reps,
      sets: sets,
      weight: weight,
      programId: selectedProgram.id,
      programName: selectedProgram.name,
      target: exercise.target.Primary,
      category: exercise.Category
      // Add more fields as needed
    };
    handleAddToProgram(exerciseData, selectedProgram.id);
  };

  const handleGoBack = () => {
    setSelectedProgram(null);
  };

  return (
    <Grid>
      <IconButton
        className={classes.closeButton}
        variant="contained"
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
      {!selectedProgram ? (
        // Display list of workout programs
        <>
          <Grid style={styles.commonFormStyles}>
            <Typography style={styles.title}>Select a program</Typography>
            {workoutList.map((program, idx) => (
              <Button key={idx} variant="contained" style={styles.workoutListButton} onClick={() => selectProgram(program)}>
                {program.name}
              </Button>
            ))}
          </Grid>
        </>
      ) : (
        // Display exercise form when a program is selected
        <>
          <Grid style={styles.programNameContainer}>
            <Button style={styles.backButton} onClick={handleGoBack}>
              Back
            </Button>
            <Typography style={styles.title}>{selectedProgram.name}</Typography>
          </Grid>
          <Typography style={styles.label}>Enter Reps, Sets, and Weight:</Typography>
          <TextField
            label="Reps"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            variant="outlined"
            fullWidth
            style={styles.textField}
          />
          <TextField
            label="Sets"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            variant="outlined"
            fullWidth
            style={styles.textField}
          />
          <TextField
            label="Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            variant="outlined"
            fullWidth
            style={styles.textField}
            InputProps={{
              endAdornment: <InputAdornment position="end">{'lbs'}</InputAdornment>
            }}
          />
          <Button variant="contained" color="primary" onClick={handleAddExercise} style={styles.addButton}>
            Add Exercise
          </Button>
        </>
      )}
    </Grid>
  );
};

export default AddExerciseForm;
