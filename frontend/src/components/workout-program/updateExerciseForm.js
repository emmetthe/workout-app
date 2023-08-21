import { Button, TextField } from '@material-ui/core';
import { useState } from 'react';

const UpdateExerciseForm = ({ exercise, onUpdate, onCancel }) => {
  const [updatedReps, setUpdatedReps] = useState(exercise.reps);
  const [updatedSets, setUpdatedSets] = useState(exercise.sets);
  const [updatedWeight, setUpdatedWeight] = useState(exercise.weight);

  const handleUpdate = () => {
    onUpdate({
      reps: updatedReps,
      sets: updatedSets,
      weight: updatedWeight
    });
  };

  return (
    <div>
      <TextField
        label="Reps"
        variant="outlined"
        value={updatedReps}
        onChange={(e) => setUpdatedReps(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <TextField
        label="Sets"
        variant="outlined"
        value={updatedSets}
        onChange={(e) => setUpdatedSets(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <TextField
        label="Weight"
        variant="outlined"
        value={updatedWeight}
        onChange={(e) => setUpdatedWeight(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <Button variant="outlined" color="primary" onClick={handleUpdate}>
        Update Exercise
      </Button>
      <Button variant="outlined" color="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  );
};

export default UpdateExerciseForm;
