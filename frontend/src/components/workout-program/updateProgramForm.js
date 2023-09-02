import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, FormGroup, FormControlLabel } from '@material-ui/core';
import Checkbox from '@mui/material/Checkbox';

const formContainerStyle = {
  marginTop: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%'
};

const UpdateProgramForm = ({ workout, onUpdate }) => {
  const { name, description, days } = workout;
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedDescription, setUpdatedDescription] = useState(description);

  // Create a state variable for selected days
  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    // When the component mounts or initialDays changes, update selectedDays
    setSelectedDays(days.map((day) => day.dayName));
  }, [days]);

  const handleCheckboxChange = (dayName) => {
    setSelectedDays((prevSelectedDays) => {
      if (prevSelectedDays.includes(dayName)) {
        return prevSelectedDays.filter((day) => day !== dayName);
      } else {
        return [...prevSelectedDays, dayName];
      }
    });
  };

  const handleUpdate = () => {
    onUpdate({
      ...workout,
      name: updatedName,
      description: updatedDescription,
      days: selectedDays
    });
  };

  return (
    <Grid style={formContainerStyle}>
      <TextField
        label="Program Name"
        variant="outlined"
        value={updatedName}
        onChange={(e) => setUpdatedName(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <TextField
        label="Description"
        variant="outlined"
        value={updatedDescription}
        onChange={(e) => setUpdatedDescription(e.target.value)}
        multiline
        style={{ marginBottom: '16px' }}
      />

      <FormGroup>
        <FormControlLabel
          label="Monday"
          labelPlacement="start"
          control={<Checkbox checked={selectedDays.includes('Monday')} onChange={() => handleCheckboxChange('Monday')} />}
        />
        <FormControlLabel
          label="Tuesday"
          labelPlacement="start"
          control={<Checkbox checked={selectedDays.includes('Tuesday')} onChange={() => handleCheckboxChange('Tuesday')} />}
        />
        <FormControlLabel
          label="Wednesday"
          labelPlacement="start"
          control={<Checkbox checked={selectedDays.includes('Wednesday')} onChange={() => handleCheckboxChange('Wednesday')} />}
        />
        <FormControlLabel
          label="Thursday"
          labelPlacement="start"
          control={<Checkbox checked={selectedDays.includes('Thursday')} onChange={() => handleCheckboxChange('Thursday')} />}
        />
        <FormControlLabel
          label="Friday"
          labelPlacement="start"
          control={<Checkbox checked={selectedDays.includes('Friday')} onChange={() => handleCheckboxChange('Friday')} />}
        />
        <FormControlLabel
          label="Saturday"
          labelPlacement="start"
          control={<Checkbox checked={selectedDays.includes('Saturday')} onChange={() => handleCheckboxChange('Saturday')} />}
        />
        <FormControlLabel
          label="Sunday"
          labelPlacement="start"
          control={<Checkbox checked={selectedDays.includes('Sunday')} onChange={() => handleCheckboxChange('Sunday')} />}
        />
      </FormGroup>

      <Button variant="outlined" color="primary" onClick={handleUpdate}>
        Update Program
      </Button>
    </Grid>
  );
};

export default UpdateProgramForm;
