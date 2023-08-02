import React from 'react';
import { Select, MenuItem } from '@mui/material';

const ExerciseFilter = ({ selectedMuscle, handleMuscleFilterChange, muscleOptions }) => {
  return (
    <Select value={selectedMuscle} onChange={handleMuscleFilterChange} variant="outlined" fullWidth displayEmpty>
      <MenuItem value="">All Muscles</MenuItem>

      {muscleOptions.map((muscle) => (
        <MenuItem key={muscle} value={muscle}>
          {muscle}
        </MenuItem>
      ))}
    </Select>
  );
};

export default ExerciseFilter;
