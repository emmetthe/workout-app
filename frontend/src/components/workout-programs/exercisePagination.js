import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/styles';

const PaginationWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '16px'
});

const ExercisePagination = ({ currentPage, totalPages, pageNumbers, handlePageChange }) => {
  return (
    <PaginationWrapper>
      <Button variant="contained" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </Button>
      {pageNumbers.map((pageNumber) => (
        <Button
          key={pageNumber}
          variant={currentPage === pageNumber ? 'contained' : 'outlined'}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </Button>
      ))}
      <Button variant="contained" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </Button>
    </PaginationWrapper>
  );
};

export default ExercisePagination;
