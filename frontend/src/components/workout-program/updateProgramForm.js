import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, FormGroup, FormControlLabel, Typography, makeStyles } from '@material-ui/core';
import Checkbox from '@mui/material/Checkbox';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '400px',
      margin: '0 auto'
    }
  },
  inputField: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  button: {
    width: '50%',
    marginTop: theme.spacing(2)
  },
  updateButton: {
    width: '50%',
    marginTop: theme.spacing(2),
    backgroundColor: '#1976d2',
    color: 'white',
    '&:hover': {
      backgroundColor: '#1565c0'
    }
  }
}));

const UpdateProgramForm = ({ workout, onUpdate, showUpdateForm }) => {
  const { name, description, days } = workout;
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const classes = useStyles();

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
    showUpdateForm();
  };

  return (
    <Grid container className={classes.formContainer}>
      <TextField
        label="Program Name"
        variant="outlined"
        value={updatedName}
        onChange={(e) => setUpdatedName(e.target.value)}
        className={classes.inputField}
      />
      <TextField
        label="Description"
        variant="outlined"
        value={updatedDescription}
        onChange={(e) => setUpdatedDescription(e.target.value)}
        multiline
        className={classes.inputField}
      />

      <Typography>Days:</Typography>

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

      <Button variant="contained" className={classes.updateButton} onClick={handleUpdate}>
        Update Program
      </Button>

      <Button variant="contained" color="secondary" className={classes.button} onClick={showUpdateForm}>
        Cancel
      </Button>
    </Grid>
  );
};

export default UpdateProgramForm;
