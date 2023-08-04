import React from 'react';
import { Button } from '@mui/material';

const paginationWrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '16px'
};

const paginationButtonStyle = {
  marginLeft: '2px',
  marginRight: '2px',
  minWidth: '80px'
};

const nextButtonStyle = {
  marginLeft: '2px',
  marginRight: '2px',
  minWidth: '107px'
};

const ExercisePagination = ({ currentPage, totalPages, pageNumbers, handlePageChange }) => {
  return (
    <div style={paginationWrapperStyle}>
      <Button
        variant="contained"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={paginationButtonStyle}
      >
        Previous
      </Button>

      {pageNumbers.map((pageNumber) => (
        <Button
          key={pageNumber}
          variant={currentPage === pageNumber ? 'contained' : 'outlined'}
          onClick={() => handlePageChange(pageNumber)}
          style={paginationButtonStyle}
        >
          {pageNumber}
        </Button>
      ))}

      <Button
        variant="contained"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={nextButtonStyle}
      >
        Next
      </Button>
    </div>
  );
};

export default ExercisePagination;
