import { Grid, Typography, useMediaQuery } from '@mui/material/';
import { CiDumbbell } from 'react-icons/ci';
import { BsCalendar2Week } from 'react-icons/bs';
import { GiWeightLiftingUp } from 'react-icons/gi';

function Features() {
  const styles = {
    featureTitle: {
      fontWeight: 'bold',
      fontSize: '1.5em',
      marginBottom: '10px'
    },
    featureDescription: {
      fontWeight: 'medium',
      fontSize: '1.4em',
      color: '#97A9B4'
    },
    appFeaturesContainer: {
      marginTop: '30px',
      marginBottom: '50px'
    },
    featureInfo: {
      textAlign: 'center',
      marginBottom: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    icon: {
      borderRadius: '50%',
      border: '2px solid gray',
      padding: '5px',
      marginBottom: '10px'
    },
    featuresList: {
      display: 'flex',
      flexDirection: 'row'
    }
  };

  // use media query to turn off typography below certain window size (600px)
  const windowSizeBelow600 = useMediaQuery('(min-width:600px)');

  return (
    <Grid container style={styles.appFeaturesContainer} justifyContent="space-around">
      {/* features description */}
      <Typography variant="h4" align="center" style={{ maxWidth: '90vw' }}>
        With over 300 exercises to explore, our app empowers you to discover new workouts to help reach your fitness goals
      </Typography>

      <Typography variant="h6" align="center" style={{ maxWidth: '90vw', marginBottom: '40px', marginTop: '10px' }}>
        Each exercise comes with accompanying videos, ensuring you master proper form and technique every step of the way
      </Typography>

      <Grid sx={styles.featuresList}>
        {/* features list */}
        <Grid item xs={12} sm={4} sx={styles.featureInfo}>
          {/* feature 1 */}
          <CiDumbbell style={styles.icon} size="5em" />
          <Typography sx={styles.featureTitle}>Comprehensive Exercise Library</Typography>

          {windowSizeBelow600 && (
            <Typography sx={styles.featureDescription}>
              Dive into our expansive exercise collection tailored to all fitness levels, from novice to expert
            </Typography>
          )}
        </Grid>

        {/* feature 2 */}
        <Grid item xs={12} sm={4} style={styles.featureInfo}>
          <BsCalendar2Week style={styles.icon} size="5em" />
          <Typography sx={styles.featureTitle}>Track your progress</Typography>

          {windowSizeBelow600 && (
            <Typography sx={styles.featureDescription}>
              Stay motivated as you track your workouts, set goals, and see your achievements unfold
            </Typography>
          )}
        </Grid>

        {/* feature 3 */}
        <Grid item xs={12} sm={4} style={styles.featureInfo}>
          <GiWeightLiftingUp style={styles.icon} size="5em" />
          <Typography sx={styles.featureTitle}>Create your own programs</Typography>
          {windowSizeBelow600 && (
            <Typography sx={styles.featureDescription}>
              Customize your workout plans by selecting specific exercises to your needs
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Features;
