import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomSnackbar from '../../snackbar/snackbar';
import { openSnackbar } from '../../../slices/snackbarSlice';
import { tokenRemoved } from '../../../slices/tokenSlice';

function SignedOutNotification() {
  const dispatch = useDispatch();
  const snackbarOpen = useSelector((state) => state.snackbar.open);
  const snackbarMessage = useSelector((state) => state.snackbar.message);
  const snackbarSeverity = useSelector((state) => state.snackbar.severity);
  const tokenStatus = useSelector((state) => state.token.status);

  useEffect(() => {
    if (tokenStatus === 'expired') {
      dispatch(
        openSnackbar({
          message: 'Your session has expired. Sign in to continue',
          severity: 'success'
        })
      )
      dispatch(tokenRemoved());
    }
  });

  return <CustomSnackbar open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} />;
}

export default SignedOutNotification;
