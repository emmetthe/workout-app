import React from 'react';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

const ExercisePagination = ({ currentPage, totalPages, pageNumbers, handlePageChange }) => {
  return (
    <div className="flex justify-center mt-4">
      {/* go to first page */}
      <button className="mx-1" onClick={() => handlePageChange(1)}>
        <MdKeyboardDoubleArrowLeft className="h-7 w-7 fill-white" />
      </button>

      {/* go to prev page */}
      <button
        className="mx-1 fill-white"
        onClick={() => {
          if (currentPage !== 1) {
            handlePageChange(currentPage - 1);
          }
        }}
        // disabled={currentPage === 1}
      >
        <MdKeyboardArrowLeft className="h-7 w-7 fill-white" />
      </button>

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`mx-1 px-4 py-2 rounded ${currentPage === pageNumber ? 'bg-[#5b79f8] text-white' : 'bg-gray-200'}`}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      {/* go to next page */}
      <button
        className="mx-1"
        onClick={() => {
          if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
          }
        }}
        // disabled={currentPage === totalPages}
      >
        <MdKeyboardArrowRight className="h-7 w-7 fill-white" />
      </button>

      {/* skip to last page */}
      <button className="mx-1" onClick={() => handlePageChange(totalPages)}>
        <MdKeyboardDoubleArrowRight className="h-7 w-7 fill-white" />
      </button>
    </div>
  );
};

export default ExercisePagination;
