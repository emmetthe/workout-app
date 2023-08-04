import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/styles';

const PaginationWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '16px'
});

const PaginationButtonStyle = {
  marginLeft: '2px',
  marginRight: '2px',
  minWidth: '80px'
};

const ExercisePagination = ({ currentPage, totalPages, pageNumbers, handlePageChange }) => {
  return (
    <PaginationWrapper>
      <Button variant="contained" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} sx={PaginationButtonStyle}>
        Previous
      </Button>

      {pageNumbers.map((pageNumber) => (
        <Button
          key={pageNumber}
          variant={currentPage === pageNumber ? 'contained' : 'outlined'}
          onClick={() => handlePageChange(pageNumber)}
          sx={PaginationButtonStyle}
        >
          {pageNumber}
        </Button>
      ))}

      <Button
        variant="contained"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        sx={{
          marginLeft: '2px',
          marginRight: '2px',
          minWidth: '100px'
        }}
      >
        Next
      </Button>
    </PaginationWrapper>
  );
};

export default ExercisePagination;
