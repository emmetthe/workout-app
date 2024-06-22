import React from 'react';
import { Grid } from '@mui/material';
import Features from './sections/Features';
import ExerciseFeature from './sections/ExerciseFeature';
import Hero from './sections/Hero';

const Home = () => {
  return (
    <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Hero />

      {/* app features */}
      <Features />
      <ExerciseFeature />
    </Grid>
  );
};

export default Home;
