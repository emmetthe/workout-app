import React from 'react';
import ExerciseCard from './exerciseCard';
import { Grid, Typography } from '@mui/material';

const styles = {
  noExercisesContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const ExerciseList = ({ exercises }) => {
  return (
    <Grid container spacing={2}>
      {exercises.length ? (
        exercises.map((exercise) => (
          <Grid item xs={12} sm={6} md={4} key={exercise.id}>
            <ExerciseCard exercise={exercise} />
          </Grid>
        ))
      ) : (
        <Grid item xs={12} sx={styles.noExercisesContainer}>
          <Typography variant="h6" align="center">
            No exercises found
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default ExerciseList;
