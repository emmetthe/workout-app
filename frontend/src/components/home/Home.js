import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, Typography, Card } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import FeaturesInformation from './sections/Features';
import ExerciseFeature from './sections/ExerciseFeature';

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    minHeight: '100vh'
  },
  header: {
    height: '60vh',
    width: '100%',
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
    [theme.breakpoints.down('sm')]: {
      height: '40vh'
    }
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.rootContainer}>
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

      <Card
        sx={{
          p: 2,
          mx: { xs: 0, sm: 3, md: 3, lg: 3 },
          mt: { xs: 0, sm: -7, md: -7, lg: -7 }
        }}
      >
        {/* app features */}
        <FeaturesInformation />
        <ExerciseFeature />
      </Card>
    </Grid>
  );
};

export default Home;
