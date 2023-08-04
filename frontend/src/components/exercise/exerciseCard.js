import React from 'react';
import { Link } from 'react-router-dom';

const ExerciseCard = ({ exercise }) => {
  return (
    <div>
      <Link to={{ pathname: `/exercise/${exercise.exercise_name}` }} state={exercise}>
        <strong>{exercise.exercise_name}</strong>
        <p>Type: {exercise.Category}</p>
      </Link>
    </div>
  );
};

export default ExerciseCard;
