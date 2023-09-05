import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWorkout, removeExercise, updateWorkout } from '../../slices/workoutThunk';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Typography, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import UpdateProgramForm from './updateProgramForm';
import EditableExerciseTable from './EditableExerciseTable';

const cardStyle = {
  padding: '16px',
  marginBottom: '16px',
  width: '100%'
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '20px',
  borderBottom: '1px solid #ccc',
  paddingBottom: '10px'
};

const infoSectionStyle = {
  marginBottom: '20px'
};

const titleStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '8px'
};

const descriptionStyle = {
  fontSize: '16px',
  color: '#666',
  marginBottom: '12px'
};

const buttonStyles = {
  marginTop: '16px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around'
};

const updateButtonStyle = {
  marginBottom: '15px'
};

const WorkoutCard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const currentState = location.state;
  // Update redux store after successfully making updates to individual exercises
  const workout = useSelector((state) => state.programs.workouts.find((exercise) => exercise.id === currentState.id));
  const { id, name, description, days, exercises } = workout;
  const [isEditing, setIsEditing] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

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

  const handleUpdateForm = () => {
    setShowUpdateForm(false);
  };

  const handleUpdate = (updatedData, updatingExercise) => {
    try {
      dispatch(updateWorkout(updatedData, id, updatingExercise));
      // Close the form after updating
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating workout:', error);
    }
  };

  return (
    <Grid style={cardStyle} elevation={3}>
      {/* Update form */}
      {showUpdateForm ? (
        <Grid item>
          <UpdateProgramForm workout={workout} onUpdate={handleUpdate} showUpdateForm={handleUpdateForm} />
        </Grid>
      ) : (
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item style={headerStyle}>
            <Typography variant="h5">{name}</Typography>
          </Grid>

          <Grid item style={infoSectionStyle}>
            <Typography style={titleStyle}>Description</Typography>
            <Typography style={descriptionStyle}>{description}</Typography>
            <Typography style={titleStyle}>Days</Typography>
            <List>
              {days.map((day, idx) => (
                <ListItem key={idx}>
                  <ListItemText primary={day.dayName} />
                </ListItem>
              ))}
            </List>

            <Typography style={titleStyle}>Exercises</Typography>
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

          <Grid item style={buttonStyles}>
            <Button variant="outlined" color="primary" style={updateButtonStyle} onClick={() => setShowUpdateForm(true)}>
              Update details
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleDelete}>
              Delete Workout
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default WorkoutCard;
