import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container } from '@material-ui/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateWorkout } from '../../slices/workoutThunk';
import { openSnackbar } from '../../slices/snackbarSlice';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  updateButton: {
    backgroundColor: '#1976d2',
    color: 'white',
    width: '100px',
    height: '40px',
    margin: '5px',
    '&:hover': {
      backgroundColor: '#1565c0'
    }
  }
});

const styles = {
  editExPageContainer: {
    marginTop: '50px'
  },
  headerStyling: {
    borderBottom: '1px solid #ccc'
  },
  titleStyling: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  buttonStyling: {
    marginTop: '20px'
  },
  buttonWidth: {
    width: '100px',
    height: '40px',
    margin: '5px'
  },
  labelStyling: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  setNumStyling: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  updateButton: {
    backgroundColor: '#1976d2',
    color: 'white',
    width: '100px',
    height: '40px',
    margin: '5px'
  }
};

const EditExercisePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { exercise } = location.state;
  const { program } = exercise;
  const [editedSets, setEditedSets] = useState([...exercise.sets]);
  const [error, setError] = useState('');

  const classes = useStyles();

  const handleInputChange = (index, field, value) => {
    const updatedSets = [...editedSets];
    updatedSets[index][field] = value;
    setEditedSets(updatedSets);
  };

  const handleUpdateClick = () => {
    if (validateFields()) {
      const newExerciseData = { ...exercise, sets: editedSets };

      dispatch(updateWorkout(newExerciseData, program, true))
        .then(() => {
          dispatch(openSnackbar({ message: 'Exercise updated successfully', severity: 'success' }));
          navigate(-1); // Navigate back to the previous page after dispatch is successful
        })
        .catch((error) => {
          console.error('Error updating workout:', error);
          dispatch(openSnackbar({ message: 'Error updating exercise', severity: 'error' }));
        });
    } else {
      setError('Please fill out all Reps and Weight fields');
    }
  };

  const handleCancelClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleAddSetClick = () => {
    // Create a new empty set and add it to the list of edited sets
    const newSet = {
      setNumber: exercise.sets.length + 1,
      reps: '',
      weight: '',
      exerciseId: exercise.exercise.id
    };
    setEditedSets([...editedSets, newSet]);
  };

  const validateFields = () => {
    // Check if all sets have both reps and weight filled out
    return editedSets.every((set) => set.reps !== '' && set.weight !== '');
  };

  return (
    <Container maxWidth="sm" style={styles.editExPageContainer}>
      <Typography variant="h4" gutterBottom style={styles.headerStyling}>
        Edit Sets
      </Typography>

      <Grid style={styles.titleStyling}>
        <Typography variant="h5">{exercise.exercise.exerciseName}</Typography>

        <Button variant="contained" color="primary" style={styles.updateButton} onClick={handleAddSetClick}>
          Add Set
        </Button>
      </Grid>

      {error && (
        <Typography variant="body2" color="error" gutterBottom>
          {error}
        </Typography>
      )}

      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Typography variant="body1" style={styles.labelStyling}>
            Set
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="body1" style={styles.labelStyling}>
            Reps
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="body1" style={styles.labelStyling}>
            Weight (lbs)
          </Typography>
        </Grid>
      </Grid>

      {editedSets.map((set, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={2} style={styles.setNumStyling}>
            <Typography variant="body1">{index + 1}</Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              variant="outlined"
              fullWidth
              value={set.reps}
              onChange={(e) => handleInputChange(index, 'reps', Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              variant="outlined"
              fullWidth
              value={set.weight}
              onChange={(e) => handleInputChange(index, 'weight', Number(e.target.value))}
            />
          </Grid>
        </Grid>
      ))}

      <Container style={styles.buttonStyling}>
        <Button variant="contained" className={classes.updateButton} onClick={handleUpdateClick}>
          Update
        </Button>
        <Button variant="contained" style={styles.buttonWidth} onClick={handleCancelClick}>
          Cancel
        </Button>
      </Container>
    </Container>
  );
};

export default EditExercisePage;
