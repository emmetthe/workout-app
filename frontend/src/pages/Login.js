import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import CSRFToken from '../components/CSRFToken';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../slices/authSlice';

const Login = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAsync(username, password));

    document.getElementById('alert').style.display = 'block';
  };

  const to = window.localStorage.getItem('to');

  if (isAuthenticated && to) {
    return <Navigate to={to} />;
  } else if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="container mt-5">
      <div id="alert" className="alert alert-warning" style={{ display: 'none' }} role="alert">
        {error}
      </div>

      <h1>Sign In</h1>
      <p>Sign into your account</p>
      <div id="alert" className="alert alert-danger" style={{ display: 'none' }} role="alert">
        Please Check your inputs
      </div>

      <form onSubmit={(e) => onSubmit(e)} autoFocus>
        <CSRFToken />
        <div className="form-group">
          <label className="form-label">Username: </label>
          <input
            className="form-control"
            type="text"
            name="username"
            onChange={(e) => onChange(e)}
            value={username}
            required
            autoComplete="true"
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
            required
            autoComplete="true"
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <p className="mt-3">
        Don't have an Account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
