import React, { useState } from 'react';
import { Grid, Button, TextField, InputAdornment, Box, Card, CardContent, Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import { Typography, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  closeButton: {
    position: 'absolute',
    right: '10px',
    top: '12px',
    padding: '7px',
    color: 'gray',
    '&:hover': {
      backgroundColor: '#F5F5F5'
    }
  },
  errorContainer: {
    marginBottom: '16px',
    textAlign: 'center'
  },
  setCard: {
    marginBottom: '5px', // Add spacing between sets
    border: '1px solid #E0E0E0', // Border to distinguish sets
    borderRadius: '5px', // Rounded corners for the card
    marginTop: '10px'
  },
  setTypography: {
    marginBottom: '1px' // Spacing between set details
  }
});

const styles = {
  backButton: {
    marginLeft: '15px',
    position: 'absolute',
    left: '15px',
    top: '20px'
  },
  title: {
    fontSize: '24px',
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '10px'
  },
  label: {
    fontSize: '16px',
    marginBottom: '8px'
  },
  textField: {
    marginBottom: '16px'
  },
  addButton: {
    marginTop: '20px',
    width: '100%'
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
  },
  cancelButton: {
    backgroundColor: 'red',
    color: 'white',
    '&:hover': {
      backgroundColor: '#ff0000'
    },
    marginTop: '20px',
    marginLeft: '20px'
  },
  exerciseSubtitle: {
    marginTop: '15px',
    marginBottom: '10px'
  },
  errorStyling: {
    width: '100%'
  },
  createSetBtn: {
    marginTop: '20px'
  }
};

const AddExerciseForm = ({ handleClose, handleAddToProgram, exercise, selectedProgram, selectProgram, setSelectedProgram }) => {
  const workouts = useSelector((state) => state.programs);
  const workoutList = workouts.workouts;
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [exerciseSets, setExerciseSets] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [addingSet, setAddingSet] = useState(false);
  const [formError, setFormError] = useState('');
  const classes = useStyles();

  const handleAddExercise = () => {
    const exerciseData = {
      ...exercise,
      sets: exerciseSets,
      programId: selectedProgram.id,
      programName: selectedProgram.name,
      target: exercise.target.Primary,
      category: exercise.Category
      // Add more fields as needed
    };

    // check to see if exercise already in program
    const checkExerciseInProgram = () => {
      const { exercises } = selectedProgram;
      const res = exercises.some((ex) => ex.exercise.id === exercise.id);
      return res;
    };

    // display error if current exercise already in selected program
    if (checkExerciseInProgram()) {
      setFormError('Exercise Already In Selected Program');
    } else {
      handleAddToProgram(exerciseData, selectedProgram.id);
    }
  };

  const handleGoBack = () => {
    // Clear the input fields
    setSelectedProgram(null);
    setExerciseSets([]);
    setReps('');
    setWeight('');
    setFormError('');
    setShowForm(true);
    setAddingSet(false);
  };

  const handleShowForm = () => {
    setFormError('');
    setShowForm(true);
    setAddingSet(true);
  };

  const handleAddSet = () => {
    if (!reps || !weight) {
      setFormError('Please fill in all fields.');
      return;
    }
    // Create a new set object and add it to the exerciseSets state
    const newSet = {
      reps: Number(reps),
      set_number: exerciseSets.length + 1,
      weight: Number(weight)
    };
    setExerciseSets([...exerciseSets, newSet]);
    // Clear the input fields
    setReps('');
    setWeight('');
    setFormError('');
    setShowForm(false);
    setAddingSet(false);
  };

  const handleCancelForm = () => {
    setReps('');
    setWeight('');
    setFormError('');
    setShowForm(false);
    setAddingSet(false);
  };

  const totalReps = exerciseSets.reduce((total, set) => total + set.reps, 0);

  return (
    <Grid>
      <IconButton className={classes.closeButton} variant="contained" onClick={handleClose}>
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
            <Button style={styles.backButton} variant="outlined" onClick={handleGoBack}>
              Change Program
            </Button>
            <Box>
              <Typography style={styles.title}>{selectedProgram.name}</Typography>
              {formError.length > 0 && (
                <Alert severity="error" sx={styles.errorStyling}>
                  {formError}
                </Alert>
              )}
            </Box>
          </Grid>
          {showForm ? (
            <>
              <Typography style={styles.label}>Set {exerciseSets.length + 1}</Typography>
              <Typography style={styles.label}>Enter Reps and Weight:</Typography>

              {/* display error */}
              {formError && (
                <Typography color="error" className={classes.errorContainer} variant="subtitle1">
                  {formError}
                </Typography>
              )}
              <TextField
                type="number"
                label="Reps"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                variant="outlined"
                fullWidth
                style={styles.textField}
                InputProps={{
                  inputProps: { min: 1 }
                }}
              />
              <TextField
                type="number"
                label="Weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                variant="outlined"
                fullWidth
                style={styles.textField}
                InputProps={{
                  endAdornment: <InputAdornment position="end">{'lbs'}</InputAdornment>,
                  inputProps: { min: 1 }
                }}
              />
              <Box display="flex" alignItems="center">
                <Button variant="contained" color="primary" onClick={handleAddSet} style={styles.createSetBtn}>
                  Create Set
                </Button>

                {exerciseSets.length > 0 && (
                  <Button variant="contained" style={styles.cancelButton} onClick={handleCancelForm}>
                    Cancel
                  </Button>
                )}
              </Box>
            </>
          ) : (
            <Box>
              {/* Display the added sets */}
              {exerciseSets.length > 0 && (
                <Card className={classes.setCard}>
                  <CardContent>
                    <Typography variant="subtitle1">{exercise.exercise_name}:</Typography>
                    <Typography className={classes.setTypography}> Total Sets: {exerciseSets.length}</Typography>
                    <Typography className={classes.setTypography}>Total Reps: {totalReps}</Typography>
                  </CardContent>
                </Card>
              )}
              <Button variant="contained" color="primary" onClick={handleShowForm} style={styles.addButton}>
                Create New Set
              </Button>
            </Box>
          )}

          {/* only show button when at least one set is created */}
          {exerciseSets.length > 0 && !addingSet && (
            <Button variant="contained" color="primary" onClick={handleAddExercise} style={styles.addButton}>
              Add To Program
            </Button>
          )}
        </>
      )}
    </Grid>
  );
};

export default AddExerciseForm;
