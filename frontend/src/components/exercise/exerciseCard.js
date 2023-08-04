import React from 'react';
import { Link } from 'react-router-dom';

const ExerciseCard = ({ exercise }) => {
  const {exercise_name, Category} = exercise

  return (
    <div>
      <Link to={{ pathname: `/exercise/${exercise_name.replaceAll(' ','-')}` }} state={exercise}>
        <strong>{exercise_name}</strong>
        <p>Type: {Category}</p>
      </Link>
    </div>
  );
};

export default ExerciseCard;
