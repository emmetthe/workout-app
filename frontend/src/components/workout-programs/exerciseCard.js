import React from 'react';
import { Link } from 'react-router-dom';

const ExerciseCard = ({ exercise }) => {
  return (
    <div>
      <Link to={{ pathname: `/exercise/${exercise.id}` }} state={exercise}>
        <strong>{exercise.exercise_name}</strong>
        <p>Type: {exercise.Category}</p>
      </Link>
      {/* <p>{exercise.videoURL}</p>
      <p>id: {exercise.id}</p>
      <p>Targeted Muscles: {exercise.target.Primary}</p>
      <p>secondary: {exercise.target.Secondary}</p>
      <p>steps: {exercise.steps}</p> */}
      {/* Add more information about the exercise here */}
    </div>
  );
};

export default ExerciseCard;
