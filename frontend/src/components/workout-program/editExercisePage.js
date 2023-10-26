import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container } from '@material-ui/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateWorkout } from '../../slices/workoutThunk';
import { openSnackbar } from '../../slices/snackbarSlice';

const EditExercisePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { exercise } = location.state;
  const { program } = exercise;
  const [editedSets, setEditedSets] = useState([...exercise.sets]);

  const handleInputChange = (index, field, value) => {
    const updatedSets = [...editedSets];
    updatedSets[index][field] = value;
    setEditedSets(updatedSets);
  };

  const handleUpdateClick = () => {
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
  };

  const handleCancelClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const styles = {
    buttonStyling: {
      marginTop: '20px'
    },
    exerciseTitle: {
      marginBottom: '20px'
    },
    buttonWidth: {
      width: '120px',
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
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Edit Sets
      </Typography>

      <Typography variant="h5" style={styles.exerciseTitle}>
        {exercise.exercise.exerciseName}
      </Typography>

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
        <Button variant="contained" color="primary" style={styles.buttonWidth} onClick={handleUpdateClick}>
          Update
        </Button>
        <Button variant="contained" color="default" style={styles.buttonWidth} onClick={handleCancelClick}>
          Cancel
        </Button>
      </Container>
    </Container>
  );
};

export default EditExercisePage;
