import React from 'react';
import { Select, MenuItem } from '@mui/material';

const ExerciseFilter = ({
  selectedMuscle,
  handleMuscleFilterChange,
  muscleOptions,
  selectedCategory,
  handleCategoryFilterChange,
  categoryOptions
}) => {
  return (
    <div>
      <Select value={selectedMuscle} onChange={handleMuscleFilterChange} variant="outlined" fullWidth displayEmpty>
        <MenuItem value="">All Muscles</MenuItem>

        {muscleOptions.map((muscle) => (
          <MenuItem key={muscle} value={muscle}>
            {muscle}
          </MenuItem>
        ))}
      </Select>

      <Select value={selectedCategory} onChange={handleCategoryFilterChange} variant="outlined" fullWidth displayEmpty>
        <MenuItem value="">All Categories</MenuItem>

        {categoryOptions.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default ExerciseFilter;
