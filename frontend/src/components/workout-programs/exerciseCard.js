import React from 'react';

const ExerciseCard = ({ exercise }) => {
  return (
    <div>
      <strong>{exercise.exercise_name}</strong>
      <p>Type: {exercise.Category}</p>
      {/* Add more information about the exercise here */}
    </div>
  );
};

export default ExerciseCard;
