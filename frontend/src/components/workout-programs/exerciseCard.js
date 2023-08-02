import React from 'react';

const ExerciseCard = ({ exercise }) => {
  return (
    <div>
      <strong>{exercise.exercise_name}</strong>
      <p>Type: {exercise.Category}</p>
      <p>id: {exercise.id}</p>
      <p>primary: {exercise.target.Primary}</p>
      <p>secondary: {exercise.target.Secondary}</p>
      <p>steps: {exercise.steps}</p>
      {/* Add more information about the exercise here */}
    </div>
  );
};

export default ExerciseCard;
