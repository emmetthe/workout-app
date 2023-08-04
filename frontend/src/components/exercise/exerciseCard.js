import { Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const ExerciseCard = ({ exercise }) => {
  const { exercise_name, Category, target } = exercise;
  const { Primary, Secondary } = target;
  const targetMuscles = [...(Primary || []), ...(Secondary || [])];

  return (
    <div>
      <Link to={{ pathname: `/exercise/${exercise_name.replaceAll(' ', '-')}` }} state={exercise}>
        <Typography variant="subtitle1">{exercise_name}</Typography>
        <Typography variant="subtitle1">Type: {Category}</Typography>
        <Typography variant="subtitle1">
          Muscles Targeted: {targetMuscles.map((muscle, i) => muscle + `${i !== targetMuscles.length - 1 ? ', ' : ''}`)}
        </Typography>
      </Link>
    </div>
  );
};

export default ExerciseCard;
