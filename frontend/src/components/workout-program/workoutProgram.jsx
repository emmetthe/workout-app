import React, { useState } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';

const WorkoutProgram = () => {
  const [selectedExercises, setSelectedExercises] = useState([]);

  // const addExerciseToProgram = (exercise) => {
  //   console.log('exercise added');
  // setSelectedExercises((prevExercises) => [...prevExercises, exercise]);
  // };

  const handleRemoveExercise = (exerciseIndex) => {
    console.log('removed exercise from program');
    // removeExerciseFromProgram(exerciseIndex);
  };

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Typography variant="h4">Workout Program</Typography>
      {selectedExercises.length === 0 ? (
        <Typography variant="subtitle1">No exercises added to the program yet.</Typography>
      ) : (
        // display workout program
        <div>
          <Typography variant="h6">Selected Exercises:</Typography>
          <ul>
            {selectedExercises.map((exercise, index) => (
              <li key={index}>
                <Typography variant="body1">
                  {exercise.exercise_name} - Sets: {exercise.sets}, Reps: {exercise.reps}
                </Typography>

                <Button variant="outlined" color="secondary" onClick={() => handleRemoveExercise(index)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Grid>
  );
};

export default WorkoutProgram;
