import { useState } from 'react';

export const usePagination = (totalExercises, exercisesPerPage, paginationRange) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalExercises / exercisesPerPage);
  const lastPageInRange = Math.min(currentPage + paginationRange - 1, totalPages);
  const firstPageInRange = Math.max(lastPageInRange - paginationRange + 1, 1);
  const pageNumbers = Array.from({ length: lastPageInRange - firstPageInRange + 1 }, (_, index) => firstPageInRange + index);
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    pageNumbers,
    indexOfFirstExercise,
    indexOfLastExercise
  };
};
