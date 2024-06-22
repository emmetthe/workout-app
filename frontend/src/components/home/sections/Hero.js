import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    minHeight: '100vh'
  },
  header: {
    height: '60vh',
    width: '70vw',
    backgroundImage: `url(${'/images/workout.jpg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: '20px',
    [theme.breakpoints.down('sm')]: {
      height: '40vh'
    }
  }
}));

const Hero = () => {
  const classes = useStyles();

  return (
    <Box className={classes.header}>
      <Typography sx={{ fontSize: { xs: '2em', sm: '2.5em', md: '4em', lg: '5em' } }} paragraph>
        Your Fitness Journey Starts Here
      </Typography>

      <Typography sx={{ fontSize: { xs: '1em', sm: '1.5em', md: '2rem', lg: '2.5em' } }} paragraph>
        A simple fitness experience for everyone
      </Typography>

      <Button variant="contained" component={Link} to="/register">
        Get Started
      </Button>
    </Box>
  );
};

export default Hero;
