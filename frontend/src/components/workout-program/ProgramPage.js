import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWorkout, removeExercise, updateWorkout } from '../../slices/workoutThunk';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Typography, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import UpdateProgramForm from './updateProgramForm';
import EditableExerciseTable from './EditableExerciseTable';
import CustomSnackbar from '../snackbar/snackbar';
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { openSnackbar } from '../../slices/snackbarSlice';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  updateButtonStyle: {
    marginBottom: '15px',
    backgroundColor: '#1976d2',
    color: 'white',
    '&:hover': {
      backgroundColor: '#1565c0'
    }
  }
});

const styles = {
  cardStyle: {
    padding: '16px',
    marginBottom: '16px',
    width: '100%'
  },
  headerStyle: {
    textAlign: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px'
  },
  infoSectionStyle: {
    marginBottom: '20px'
  },
  titleStyle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '8px'
  },
  descriptionStyle: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '12px'
  },
  buttonStyles: {
    marginTop: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  backButton: {
    position: 'absolute',
    left: '75px',
  }
};

const ProgramPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const currentState = location.state;
  // Update redux store after successfully making updates to individual exercises
  const workout = useSelector((state) => state.programs.workouts.find((exercise) => exercise.id === currentState.id));
  const { id, name, description, days, exercises } = workout;
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const classes = useStyles();

  // Use Redux store to manage snackbar state
  const snackbarOpen = useSelector((state) => state.snackbar.open);
  const snackbarMessage = useSelector((state) => state.snackbar.message);
  const snackbarSeverity = useSelector((state) => state.snackbar.severity);

  const handleDelete = async (exerciseId, delExercise) => {
    // exerciseId === ExerciseInProgramView id
    try {
      if (delExercise) {
        dispatch(removeExercise(id, exerciseId));
      } else {
        dispatch(deleteWorkout(id));
        navigate('/dashboard'); // Redirect to dashboard page after deleting
      }
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

  const handleBackButton = () => {
    navigate('/dashboard');
  };

  const handleUpdateForm = () => {
    setShowUpdateForm(false);
  };

  const handleUpdate = (updatedData, updatingExercise) => {
    try {
      dispatch(updateWorkout(updatedData, id, updatingExercise));
      dispatch(openSnackbar({ message: 'Details updated successfully', severity: 'success' }));
    } catch (error) {
      console.error('Error updating workout:', error);
    }
  };

  return (
    <Grid style={styles.cardStyle} elevation={3}>
      {/* Update form */}
      {showUpdateForm ? (
        <Grid item>
          <UpdateProgramForm workout={workout} onUpdate={handleUpdate} showUpdateForm={handleUpdateForm} />
        </Grid>
      ) : (
        <Grid container direction="column" alignItems="center" spacing={2}>
          <IconButton style={styles.backButton} onClick={() => handleBackButton()}>
            <ArrowBackIcon />
          </IconButton>
          <Grid item style={styles.headerStyle}>
            <Typography variant="h5">{name}</Typography>
          </Grid>

          <Grid item style={styles.infoSectionStyle}>
            <Typography style={styles.titleStyle}>Description</Typography>
            <Typography style={styles.descriptionStyle}>{description}</Typography>
            <Typography style={styles.titleStyle}>Days</Typography>
            <List>
              {days.map((day, idx) => (
                <ListItem key={idx}>
                  <ListItemText primary={day.dayName} />
                </ListItem>
              ))}
            </List>

            <Typography style={styles.titleStyle}>Exercises</Typography>
            {exercises.length > 0 ? (
              <EditableExerciseTable
                exercises={exercises}
                onUpdateExercise={(updatedData) => handleUpdate(updatedData, true)}
                onDeleteExercise={(exerciseId, delExercise) => handleDelete(exerciseId, delExercise)}
              />
            ) : (
              <Typography>No exercises found</Typography>
            )}
          </Grid>

          <Grid item style={styles.buttonStyles}>
            <Button variant="contained" className={classes.updateButtonStyle} onClick={() => setShowUpdateForm(true)}>
              Update details
            </Button>
            <Button variant="contained" color="secondary" onClick={handleDelete}>
              Delete Workout
            </Button>
          </Grid>
        </Grid>
      )}
      <CustomSnackbar open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} />
    </Grid>
  );
};

export default ProgramPage;
