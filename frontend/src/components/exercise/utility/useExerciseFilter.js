import { useState, useEffect } from 'react';

export const useExerciseFilter = (exercises, searchQuery, selectedMuscle, selectedCategory) => {
  const [filteredExercises, setFilteredExercises] = useState([]);

  useEffect(() => {
    let filtered = exercises;

    if (searchQuery) {
      filtered = filtered.filter(
        (exercise) => exercise.exercise_name && exercise.exercise_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedMuscle) {
      filtered = filtered.filter((exercise) => exercise.target.Primary && exercise.target.Primary.includes(selectedMuscle));
    }

    if (selectedCategory) {
      filtered = filtered.filter((exercise) => exercise.Category && exercise.Category === selectedCategory);
    }

    setFilteredExercises(filtered);
  }, [searchQuery, selectedMuscle, selectedCategory, exercises]);

  return { filteredExercises };
};
