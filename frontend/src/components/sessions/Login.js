import React, { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../../slices/authSlice';
import { clearErrors } from '../../slices/errorSlice';
import { Box, Button, Typography, TextField, Container, Grid } from '@mui/material';
import { Alert } from '@mui/material';

const Login = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.errors) || [];
  const dispatch = useDispatch();

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

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
          Sign into your account
        </Typography>

        {error.length > 0 && <Alert severity="error">{error}</Alert>}

        <Box component="form" onSubmit={onSubmit} autoFocus sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Username"
                name="username"
                onChange={onChange}
                value={username}
                required
                autoComplete="true"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Password"
                type="password"
                name="password"
                onChange={onChange}
                value={password}
                required
                autoComplete="true"
              />
            </Grid>
          </Grid>

          <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
            Login
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={(e) => {
              e.preventDefault();
              dispatch(loginAsync('demo', '12345678'));
            }}
            sx={{ mt: 2 }}
          >
            Demo Login
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an Account? <Link to="/register">Sign Up</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
