import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteWorkout, updateWorkout } from '../../slices/workoutThunk';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Typography, Paper } from '@material-ui/core';

const cardStyle = {
  padding: '16px',
  marginBottom: '16px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
};

const buttonContainerStyle = {
  marginTop: '16px',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%'
};

const WorkoutCard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const workout = location.state;
  const { id, name, description, days, exercises } = workout;

  const handleDelete = async () => {
    try {
      dispatch(deleteWorkout(id));
      navigate('/dashboard'); // Redirect to dashboard page after deleting
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

  return (
    <Paper style={cardStyle} elevation={3}>
      <Typography variant="h5" align="center" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        {description}
      </Typography>

      <Typography variant="body1" align="center" gutterBottom>
        exercises:
      </Typography>
      {exercises.map((exercise, idx) => (
        <Typography variant="body1" key={idx} align="center" gutterBottom>
          {exercise.exercise.name}
        </Typography>
      ))}

      <Typography variant="h6" align="center" gutterBottom>
        Days:
      </Typography>
      {days.map((day, idx) => (
        <Typography variant="body1" key={idx} align="center" gutterBottom>
          {day.dayName}
        </Typography>
      ))}

      {/* add exercises */}

      <div style={buttonContainerStyle}>
        <Button variant="outlined" color="primary" onClick={() => dispatch(updateWorkout(id))}>
          Update Workout
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleDelete}>
          Delete Workout
        </Button>
      </div>
    </Paper>
  );
};

export default WorkoutCard;
