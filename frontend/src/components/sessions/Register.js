import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { signUpAsync } from '../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import CSRFToken from '../CSRFToken';
import { clearErrors } from '../../slices/errorSlice';
import { TextField, Button, Container, Paper, Typography, CssBaseline } from '@mui/material';
import { Alert } from '@mui/material';

const Register = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.errors);
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

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

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
      <CssBaseline />
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" component="h1">
          Register for an Account
        </Typography>
        <Typography variant="body1" gutterBottom>
          Create an account
        </Typography>

        <form onSubmit={(e) => onSubmit(e)}>
          <CSRFToken />
          <div>
            <div>{error && <Alert severity="error">{error}</Alert>}</div>

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

            <Button type="submit" variant="contained" color="primary" fullWidth disabled={!areAllFieldsFilled}>
              Sign Up
            </Button>
          </div>
        </form>

        <Typography variant="body2" gutterBottom>
          Already have an Account? <Link to="/login">Sign In</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
