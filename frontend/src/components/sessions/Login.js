import React, { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import CSRFToken from '../CSRFToken';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../../slices/authSlice';
import { clearErrors } from '../../slices/errorSlice';
import { Box, Button, Typography } from '@mui/material';

const Login = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.errors);
  const dispatch = useDispatch();
  const to = window.localStorage.getItem('to');

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const { username, password } = formData;

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAsync(username, password));
  };

  if (isAuthenticated && to) {
    return <Navigate to={to} />;
  } else if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Box>
      <h1>Sign In</h1>
      <p>Sign into your account</p>

      <div>{error ? error : null}</div>

      <Box component="form" onSubmit={(e) => onSubmit(e)} autoFocus>
        <CSRFToken />
        <div>
          <label>Username: </label>
          <input type="text" name="username" onChange={(e) => onChange(e)} value={username} required autoComplete="true" />
        </div>

        <div>
          <label>Password: </label>
          <input type="password" name="password" onChange={(e) => onChange(e)} value={password} required autoComplete="true" />
        </div>
        <Button variant="outlined" type="submit">
          Login
        </Button>
        <Button
          variant="outlined"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            dispatch(loginAsync('demo', '12345678'));
          }}
        >
          Demo
        </Button>
      </Box>

      <Typography variant="body2">
        Don't have an Account? <Link to="/register">Sign Up</Link>
      </Typography>
    </Box>
  );
};

export default Login;
