import React, { useState } from 'react';
import { Button, FormControl, Select, MenuItem } from '@mui/material';

const ExerciseFilter = ({ muscles, categories, onMuscleFilterChange, onCategoryFilterChange }) => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <Button variant="contained" color="primary" onClick={toggleFilters}>
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </Button>
      {showFilters && (
        <>
          <FormControl style={{ minWidth: 200, marginLeft: 16 }}>
            <Select value={muscles.selected} onChange={onMuscleFilterChange} displayEmpty>
              <MenuItem value="">All Muscles</MenuItem>
              {muscles.all
                .sort((a, b) => a.localeCompare(b))
                .map((muscle) => (
                  <MenuItem key={muscle} value={muscle}>
                    {muscle}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <FormControl style={{ minWidth: 200, marginLeft: 16 }}>
            <Select value={categories.selected} onChange={onCategoryFilterChange} displayEmpty>
              <MenuItem value="">All Categories</MenuItem>
              {categories.all
                .sort((a, b) => a.localeCompare(b))
                .map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </>
      )}
    </div>
  );
};

export default ExerciseFilter;