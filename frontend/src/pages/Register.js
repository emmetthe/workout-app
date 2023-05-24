import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { loginAsync, signUpAsync } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import CSRFToken from '../components/CSRFToken';

const Register = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.auth.error);
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
    <div className="container mt-3">
      <div className="container mt-5">
        <h1>Register for an Account</h1>
        <p>Create an account</p>

        <form onSubmit={(e) => onSubmit(e)}>
          <CSRFToken />
          <div className="form-group">
            <p>{error ? error : null}</p>

            <label className="form-label">Username: </label>
            <input
              className="form-control"
              type="text"
              name="username"
              onChange={(e) => onChange(e)}
              value={username}
              required
              autoComplete="false"
            />
          </div>

          <div className="form-group">
            <label className="form-label mt-3">Password: </label>
            <input
              className="form-control"
              type="password"
              name="password"
              onChange={(e) => onChange(e)}
              value={password}
              minLength="6"
              required
              autoComplete="false"
            />
          </div>

          <div className="form-group">
            <label className="form-label mt-3">Confirm Password: </label>
            <input
              className="form-control"
              type="password"
              name="re_password"
              onChange={(e) => onChange(e)}
              value={re_password}
              minLength="6"
              required
              autoComplete="false"
            />
          </div>

          <button type="submit" variant="secondary" disabled={!areAllFieldsFilled}>
            Sign Up
          </button>
        </form>

        <p className="mt-3">
          Already have an Account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
