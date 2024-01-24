import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { signUpAsync } from '../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../slices/errorSlice';
import { TextField, Button, Container, Paper, Typography, Grid, Backdrop, CircularProgress } from '@mui/material';
import { Alert } from '@mui/material';

const Register = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.errors) || [];
  const dispatch = useDispatch();
  localStorage.removeItem('to');

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    re_password: ''
  });
  const [accountCreated, setAccountCreated] = useState(false);
  const areAllFieldsFilled = formData['username'] !== '' && formData['password'] !== '' && formData['re_password'] !== '';
  const { username, password, re_password } = formData;
  const [backDropStatus, setBackdropStatus] = useState(false);

  const openBackdrop = () => {
    setBackdropStatus(true);
  };

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  useEffect(() => {
    if(error) {
      setBackdropStatus(false)
    };
  }, [error]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(signUpAsync(username, password, re_password));
    if (isAuthenticated) {
      setAccountCreated(true);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  } else if (accountCreated) {
    return <Navigate to="/login" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Grid elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Create an account
        </Typography>

        {/* open backdrop when calling login api */}
        {backDropStatus && (
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openBackdrop}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}

        <form
          onSubmit={(e) => {
            onSubmit(e);
            openBackdrop();
          }}
        >
          <div>
            <div>{error.length > 0 && <Alert severity="error">{error}</Alert>}</div>

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Username"
              name="username"
              onChange={(e) => onChange(e)}
              value={username}
              required
              autoComplete="false"
            />

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              name="password"
              type="password"
              onChange={(e) => onChange(e)}
              value={password}
              minLength="6"
              required
              autoComplete="false"
            />

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Confirm Password"
              name="re_password"
              type="password"
              onChange={(e) => onChange(e)}
              value={re_password}
              minLength="6"
              required
              autoComplete="false"
            />

            <Button type="submit" variant="contained" color="primary" fullWidth disabled={!areAllFieldsFilled} sx={{ mt: 1 }}>
              Sign Up
            </Button>
          </div>
        </form>

        <Typography variant="body2" gutterBottom sx={{ marginTop: 2 }}>
          Already have an Account? <Link to="/login">Sign In</Link>
        </Typography>
      </Grid>
    </Container>
  );
};

export default Register;
