import React, { useState } from 'react';
import { Button, FormControl, Select, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExerciseFilter = ({ muscles, categories, onFilterChange }) => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const clearFilters = () => {
    onFilterChange(null, true, '');
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <Button variant="contained" color="primary" startIcon={<ExpandMoreIcon />} onClick={toggleFilters} sx={{ marginBottom: 2 }}>
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </Button>
      {showFilters && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FormControl sx={{ minWidth: 200, marginRight: 2 }}>
            <Select value={muscles.selected} onChange={(event) => onFilterChange(event, muscles.selected, 'muscle')} displayEmpty>
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

          <FormControl sx={{ minWidth: 200, marginRight: 2 }}>
            <Select value={categories.selected} onChange={(event) => onFilterChange(event, categories.selected, 'category')} displayEmpty>
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
          <Button variant="outlined" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExerciseFilter;
