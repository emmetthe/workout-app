import React from 'react';
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { Button, Grid, Typography } from '@mui/material';

const Home = () => {
  const workoutImage = '/images/workout.png';
  const squatImage = '/images/squat.png';
  const chartImage = '/images/chart.png';
  const scheudleImage = '/images/schedule.png';
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Grid className="container">
      <Typography variant="body1" paragraph>
        Your Fitness Journey Starts Here
      </Typography>

      <Typography variant="body1" paragraph>
        A simple fitness experience for everyone
      </Typography>

      <img src={workoutImage} alt="Workout" style={{ width: '100%', height: 'auto', maxWidth: '1000px', margin: '20px 0' }} />
      <Button variant="contained" component={Link} to="/register">
        Get Started
      </Button>

      <img src={squatImage} alt="Workout" style={{ width: '100%', height: 'auto', maxWidth: '400px', margin: '20px 0' }} />
      <Typography variant="body1" paragraph>
        300+ Exercises to choose from
      </Typography>

      <img src={chartImage} alt="Workout" style={{ width: '100%', height: 'auto', maxWidth: '400px', margin: '20px 0' }} />
      <Typography variant="body1" paragraph>
        Track your progress
      </Typography>

      <img src={scheudleImage} alt="Workout" style={{ width: '100%', height: 'auto', maxWidth: '500px', margin: '20px 0' }} />
      <Typography variant="body1" paragraph>
        Create your own programs
      </Typography>
    </Grid>
  );
};

export default Home;
