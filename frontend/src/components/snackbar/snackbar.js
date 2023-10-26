import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import { closeSnackbar } from '../../slices/snackbarSlice';

const CustomSnackbar = ({ open, message, severity }) => {
  const dispatch = useDispatch();

  const handleSnackbarClose = () => {
    dispatch(closeSnackbar());
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleSnackbarClose}>
      <Alert onClose={handleSnackbarClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
