import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWorkout, removeExercise, updateWorkout } from '../../slices/workoutThunk';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Typography, Paper, Grid, IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import UpdateProgramForm from './updateProgramForm';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateExerciseForm from './updateExerciseForm';

const cardStyle = {
  padding: '16px',
  marginBottom: '16px',
  width: '100%',
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
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

const WorkoutCard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const currentState = location.state;
  // Update redux store after successfully making updates to individual exercises
  const workout = useSelector((state) => state.programs.workouts.find((exercise) => exercise.id === currentState.id));
  const { id, name, description, days, exercises } = workout;
  const [isEditing, setIsEditing] = useState(false);
  const [editingExerciseIndex, setEditingExerciseIndex] = useState(-1);

  const handleDelete = async (exerciseId, delExercise) => {
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

  const handleUpdate = (updatedData) => {
    try {
      dispatch(updateWorkout(updatedData, id));
      // Close the form after updating
      setIsEditing(false);
      setEditingExerciseIndex(-1);
    } catch (error) {
      console.error('Error updating workout:', error);
    }
  };

  return (
    <Paper style={cardStyle} elevation={3}>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item style={headerStyle}>
          <Typography variant="h5">{name}</Typography>
        </Grid>

        <Grid item style={infoSectionStyle}>
          <Typography style={titleStyle}>Description</Typography>
          <Typography style={descriptionStyle}>{description}</Typography>

          <Typography style={titleStyle}>Exercises</Typography>
          <List>
            {exercises.map((exercise, idx) => (
              <ListItem key={idx}>
                <ListItemText primary={exercise.exercise.exerciseName} />
                {editingExerciseIndex === idx ? (
                  <UpdateExerciseForm
                    exercise={exercise}
                    onUpdate={(updatedData) => handleUpdate(updatedData, idx)}
                    onCancel={() => setEditingExerciseIndex(-1)}
                  />
                ) : (
                  <IconButton onClick={() => setEditingExerciseIndex(idx)}>
                    <EditIcon />
                  </IconButton>
                )}

                <Button variant="outlined" color="secondary" onClick={() => handleDelete(exercise.id, true)}>
                  <DeleteIcon />
                </Button>
              </ListItem>
            ))}
          </List>

          <Typography style={titleStyle}>Days</Typography>
          <List>
            {days.map((day, idx) => (
              <ListItem key={idx}>
                <ListItemText primary={day.dayName} />
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid item style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => setIsEditing(true)}>
            <EditIcon />
          </IconButton>
          <Button variant="outlined" color="secondary" onClick={handleDelete}>
            Delete Workout
          </Button>
        </Grid>

        <Grid item>
          {/* Update form */}
          {isEditing && <UpdateProgramForm initialName={name} initialDescription={description} onUpdate={handleUpdate} />}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default WorkoutCard;
