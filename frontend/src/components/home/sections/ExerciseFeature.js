import { Button, Grid, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  centerSection: {
    marginTop: '40px',
    marginBottom: '40px',
    textAlign: 'center',
    alignItems: 'center'
  },
  imageDescriptionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px 0'
  },
  image: {
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '100%',
    maxHeight: '350px'
  },
  centerElementTextRight: {
    marginLeft: '10%'
  },
  centerElementTextLeft: {
    marginRight: '10%'
  }
}));

function ExerciseFeature() {
  const classes = useStyles();
  const cardio = '/images/cardio.jpg';
  const powerlift = '/images/powerlift.jpg';
  const yoga = '/images/yoga.jpg';

  return (
    <Grid container direction="column" alignItems="center">
      <Typography variant="h4" align="center" style={{ maxWidth: '90vw' }}>
        With over 300 exercises to explore, our app empowers you to discover new workouts to help reach your fitness goals
      </Typography>

      <Typography variant="h6" align="center" style={{ maxWidth: '90vw', marginBottom: '40px', marginTop: '10px' }}>
        Each exercise comes with accompanying videos, ensuring you master proper form and technique every step of the way
      </Typography>

      <Grid container direction="row" className={classes.centerSection} spacing={2}>
        <Grid item xs={12} sm={4}>
          <Grid container direction="column" alignItems="center">
            <Typography variant="h4">Strength</Typography>
            <div className={classes.imageDescriptionContainer}>
              <img src={powerlift} alt="powerlifting logo" className={classes.image} />
            </div>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Grid container direction="column" alignItems="center">
            <Typography variant="h4">Yoga</Typography>
            <div className={classes.imageDescriptionContainer}>
              <img src={yoga} alt="yoga logo" className={classes.image} />
            </div>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Grid container direction="column" alignItems="center">
            <Typography variant="h4">Cardio</Typography>
            <div className={classes.imageDescriptionContainer}>
              <img src={cardio} alt="cardio logo" className={classes.image} />
            </div>
          </Grid>
        </Grid>
      </Grid>

      <Button variant="contained" component={Link} to="/exercises">
        Explore Exercises
      </Button>
    </Grid>
  );
}

export default ExerciseFeature;
