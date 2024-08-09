import React from 'react';
import { Link } from 'react-router-dom';

const ExerciseCard = ({ exercise }) => {
  const { exercise_name, Category, target } = exercise;
  const { Primary, Secondary } = target;
  const targetMuscles = [...(Primary || []), ...(Secondary || [])];

  return (
    <Link
      to={{ pathname: `/exercise/${exercise_name.replaceAll(' ', '-')}` }}
      state={exercise}
      className="no-underline text-inherit w-full"
    >
      <div className="border bg-gray-light border-gray-300 rounded-lg flex flex-col justify-between h-full">
        <div className="p-4 flex flex-col flex-grow">
          <h6 className="text-lg font-semibold">{exercise_name}</h6>
          <p className="text-sm mt-2">Type: {Category}</p>
          <p className="text-sm mt-2">Muscles Targeted: {targetMuscles.length > 0 ? targetMuscles.join(', ') : 'N/A'}</p>
        </div>
      </div>
    </Link>
  );
};

export default ExerciseCard;
