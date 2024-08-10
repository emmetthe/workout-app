import React, { useState } from 'react';
import ExerciseFilter from './exerciseFilter';
import ExercisePagination from './exercisePagination';
import ExerciseList from './exerciseList';
import Spinner from '../spinner/spinner';
import { Link } from 'react-router-dom';
import { useFetchExercises } from './utility/fetchExercises';
import { useExerciseFilter } from './utility/useExerciseFilter';
import { usePagination } from './utility/usePagination';

const ExerciseIndex = () => {
  const { exercises, isLoading } = useFetchExercises();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { filteredExercises } = useExerciseFilter(exercises, searchQuery, selectedMuscle, selectedCategory);
  const { currentPage, setCurrentPage, totalPages, pageNumbers, indexOfFirstExercise, indexOfLastExercise } = usePagination(
    filteredExercises.length,
    9,
    5
  );

  const [isFocused, setIsFocused] = useState(false);

  const handleSearchChange = (event) => setSearchQuery(event.target.value);
  const handleFilterChange = (event, val, filterType) => {
    if (val === true) {
      setSelectedMuscle('');
      setSelectedCategory('');
    } else {
      const newValue = event.target.value;
      if (filterType === 'muscle') setSelectedMuscle(newValue);
      else if (filterType === 'category') setSelectedCategory(newValue);
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const muscleList = Array.from(
    new Set(
      exercises
        .filter((exercise) => exercise.target.Primary)
        .map((exercise) => exercise.target.Primary)
        .flat()
    )
  );
  const categoryList = Array.from(
    new Set(
      exercises
        .filter((exercise) => exercise.Category)
        .map((exercise) => exercise.Category)
        .flat()
    )
  );
  const currentExercises = filteredExercises.slice(indexOfFirstExercise, indexOfLastExercise);

  return (
    <div className="container mx-auto mt-12">
      <div className={`${isFocused ? 'brightness-50 pointer-events-none' : ''}`}>
        <ExerciseFilter
          muscles={{ all: muscleList, selected: selectedMuscle }}
          categories={{ all: categoryList, selected: selectedCategory }}
          onFilterChange={handleFilterChange}
        />
      </div>

      <div onSubmit={(e) => e.preventDefault()} className="mb-5 mt-5 relative">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Search exercises"
          value={searchQuery}
          onChange={handleSearchChange}
          list="exercise-options"
          autoComplete="off"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {isFocused && (
          <ul
            id="exercise-options"
            className="absolute left-0 right-0 max-h-40 bg-white overflow-y-scroll border border-gray-300 rounded mt-1 z-50"
          >
            {(filteredExercises.length ? filteredExercises : exercises).map((exercise, index) => (
              <Link state={exercise} to={`/exercise/${exercise.exercise_name.replaceAll(' ', '-')}`} key={index}>
                <li className="p-2 hover:bg-gray-200 cursor-pointer">{exercise.exercise_name}</li>
              </Link>
            ))}
          </ul>
        )}
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className={`grid gap-4 ${isFocused ? 'brightness-50 pointer-events-none' : ''}`}>
            <div className="col-span-12">
              <ExerciseList exercises={currentExercises} />
            </div>
            <div className="col-span-12">
              <ExercisePagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageNumbers={pageNumbers}
                handlePageChange={setCurrentPage}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExerciseIndex;
