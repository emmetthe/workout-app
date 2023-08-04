import React from 'react';
import ExerciseCard from './exerciseCard';
import { Grid } from '@mui/material';

const ExerciseList = ({ exercises }) => {
  return (
    <Grid container spacing={2}>
      {exercises.map((exercise) => (
        <Grid item xs={12} sm={6} md={4} key={exercise.id}>
          <ExerciseCard exercise={exercise} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ExerciseList;
