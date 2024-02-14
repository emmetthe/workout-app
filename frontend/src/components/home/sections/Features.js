// import { Grid, Typography } from '@mui/material/';
// import { makeStyles } from '@material-ui/core/styles';
// import { CiDumbbell } from 'react-icons/ci';
// import { BsCalendar2Week } from 'react-icons/bs';
// import { GiWeightLiftingUp } from 'react-icons/gi';

// const useStyles = makeStyles((theme) => ({
//   appFeaturesContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: '30px'
//   },
//   featureInfo: {
//     textAlign: 'center',
//     width: '30%',
//     marginBottom: '5px'
//   },
//   icon: {
//     borderRadius: '50%',
//     border: '2px solid gray',
//     padding: '5px',
//     marginBottom: '10px'
//   }
// }));

// function FeaturesInformation() {
//   const classes = useStyles();
//   const styles = {
//     featureTitle: {
//       fontWeight: 'bold',
//       fontSize: '1.5em'
//     },
//     featureDescription: {
//       fontWeight: 'medium',
//       fontSize: '1.4em',
//       color: 'dimgray',
//       marginTop: '10px'
//     }
//   };

//   return (
//     <Grid className={classes.appFeaturesContainer}>
//       <Grid className={classes.featureInfo}>
//         <CiDumbbell className={classes.icon} size="5em" />
//         <Typography sx={styles.featureTitle}>Comprehensive Exercise Library</Typography>
//         <Typography sx={styles.featureDescription}>Dive into our expansive exercise collection tailored to all fitness levels, from novice to expert</Typography>
//       </Grid>

//       <Grid className={classes.featureInfo}>
//         <BsCalendar2Week className={classes.icon} size="5em" />
//         <Typography sx={styles.featureTitle}>Track your progress</Typography>
//         <Typography sx={styles.featureDescription}>
//           Stay motivated as you track your workouts, set goals, and see your achievements unfold
//         </Typography>
//       </Grid>

//       <Grid className={classes.featureInfo}>
//         <GiWeightLiftingUp className={classes.icon} size="5em" />
//         <Typography sx={styles.featureTitle}>Create your own programs</Typography>
//         <Typography sx={styles.featureDescription}>Customize your workout plans by selecting specific exercises to your needs</Typography>
//       </Grid>
//     </Grid>
//   );
// }

// export default FeaturesInformation;

import { Grid, Typography, useMediaQuery } from '@mui/material/';
import { makeStyles } from '@material-ui/core/styles';
import { CiDumbbell } from 'react-icons/ci';
import { BsCalendar2Week } from 'react-icons/bs';
import { GiWeightLiftingUp } from 'react-icons/gi';

const useStyles = makeStyles((theme) => ({
  appFeaturesContainer: {
    marginTop: '30px',
    marginBottom: '50px'
  },
  featureInfo: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  icon: {
    borderRadius: '50%',
    border: '2px solid gray',
    padding: '5px',
    marginBottom: '10px'
  }
}));

function FeaturesInformation() {
  const classes = useStyles();
  const styles = {
    featureTitle: {
      fontWeight: 'bold',
      fontSize: '1.5em',
      marginBottom: '10px'
    },
    featureDescription: {
      fontWeight: 'medium',
      fontSize: '1.4em',
      color: 'dimgray'
    }
  };

  // use media query to turn off typography below certain window size (600px)
  const windowSizeBelow600 = useMediaQuery('(min-width:600px)');

  return (
    <Grid container className={classes.appFeaturesContainer} justifyContent="space-around">
      <Grid item xs={12} sm={4} className={classes.featureInfo}>
        <CiDumbbell className={classes.icon} size="5em" />
        <Typography sx={styles.featureTitle}>Comprehensive Exercise Library</Typography>

        {windowSizeBelow600 && (
          <Typography sx={styles.featureDescription}>
            Dive into our expansive exercise collection tailored to all fitness levels, from novice to expert
          </Typography>
        )}
      </Grid>

      <Grid item xs={12} sm={4} className={classes.featureInfo}>
        <BsCalendar2Week className={classes.icon} size="5em" />
        <Typography sx={styles.featureTitle}>Track your progress</Typography>

        {windowSizeBelow600 && (
          <Typography sx={styles.featureDescription}>
            Stay motivated as you track your workouts, set goals, and see your achievements unfold
          </Typography>
        )}
      </Grid>

      <Grid item xs={12} sm={4} className={classes.featureInfo}>
        <GiWeightLiftingUp className={classes.icon} size="5em" />
        <Typography sx={styles.featureTitle}>Create your own programs</Typography>
        {windowSizeBelow600 && (
          <Typography sx={styles.featureDescription}>Customize your workout plans by selecting specific exercises to your needs</Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default FeaturesInformation;
