import { Button, TextField } from '@material-ui/core';
import { Grid, InputAdornment } from '@mui/material';
import { useState } from 'react';

const styles = {
  container: {
    padding: '16px'
  },
  textField: {
    marginBottom: '16px'
  },
  textFieldWithAdornment: {
    marginBottom: '16px',
    // minWidth: '65%'
  },
  button: {
    marginBottom: '10px'
  }
};

const UpdateExerciseForm = ({ exercise, onUpdate, onCancel }) => {
  const [updatedReps, setUpdatedReps] = useState(exercise.reps);
  const [updatedSets, setUpdatedSets] = useState(exercise.sets);
  const [updatedWeight, setUpdatedWeight] = useState(exercise.weight);
  const { exerciseName } = exercise;

  const handleUpdate = () => {
    onUpdate({
      ...exercise,
      exerciseName,
      reps: updatedReps,
      sets: parseInt(updatedSets),
      weight: parseInt(updatedWeight)
    });
  };

  return (
    <Grid alignItems="center" style={styles.container}>
      <TextField
        label="Reps"
        variant="outlined"
        value={updatedReps}
        onChange={(e) => setUpdatedReps(e.target.value)}
        style={styles.textField}
      />
      <TextField
        label="Sets"
        variant="outlined"
        value={updatedSets}
        onChange={(e) => setUpdatedSets(e.target.value)}
        style={styles.textField}
      />
      <TextField
        label="Weight"
        variant="outlined"
        value={updatedWeight}
        onChange={(e) => setUpdatedWeight(e.target.value)}
        InputProps={{
          endAdornment: <InputAdornment position="start">lbs</InputAdornment>
        }}
        style={styles.textFieldWithAdornment}
      />
      <Button variant="outlined" color="primary" style={styles.button} onClick={handleUpdate}>
        Update Exercise
      </Button>
      <Button variant="outlined" color="secondary" style={styles.button} onClick={onCancel}>
        Cancel
      </Button>
    </Grid>
  );
};

export default UpdateExerciseForm;
