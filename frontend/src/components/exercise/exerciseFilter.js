import React, { useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import { Button } from '@material-ui/core';

const ExerciseFilter = ({
  selectedMuscle,
  handleMuscleFilterChange,
  muscleOptions,
  selectedCategory,
  handleCategoryFilterChange,
  categoryOptions
}) => {
  const [filterStatus, setFilterStatus] = useState(false);

  const handleFilterStatus = (e) => {
    setFilterStatus(!filterStatus);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleFilterStatus}>
        Filters
      </Button>
      {filterStatus ? (
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
      ) : null}
    </>
  );
};

export default ExerciseFilter;
