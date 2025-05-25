import React from 'react';
import ExerciseCard from './exerciseCard';

const ExerciseList = ({ exercises }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {exercises.length ? (
        exercises.map((exercise) => (
          <div key={exercise.id} className="col-span-1">
            <ExerciseCard exercise={exercise} />
          </div>
        ))
      ) : (
        <div className="col-span-full flex justify-center items-center">
          <p className="text-lg text-center">No exercises found</p>
        </div>
      )}
    </div>
  );
};

export default ExerciseList;
