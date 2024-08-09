import React from 'react';

const ExercisePagination = ({ currentPage, totalPages, pageNumbers, handlePageChange }) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        className="mx-1 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`mx-1 px-4 py-2 rounded ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        className="mx-1 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default ExercisePagination;
