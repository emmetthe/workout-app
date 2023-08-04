import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAsync } from '../slices/authSlice';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logoutAsync());
  };

  const navLinkStyle = {
    color: 'white',
    textDecoration: 'none',
    marginRight: '16px'
  };

  const buttonGroupStyle = {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center'
  };

  return (
    <AppBar position="static" sx={{ marginBottom: '50px' }}>
      <Toolbar>
        <nav>
          <ul style={{ listStyleType: 'none', display: 'flex', alignItems: 'center' }}>
            <li>
              <NavLink style={{ ...navLinkStyle }} exact to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink style={navLinkStyle} exact to="/exercises">
                Find Exercises
              </NavLink>
            </li>
          </ul>
        </nav>

        <div style={buttonGroupStyle}>
          {isAuthenticated ? (
            <Fragment>
              <NavLink style={{ ...navLinkStyle }} to="/dashboard">
                Dashboard
              </NavLink>
              <a style={{ ...navLinkStyle }} onClick={(e) => handleLogOut(e)} href="#!">
                Logout
              </a>
            </Fragment>
          ) : (
            <Fragment>
              <NavLink style={{ ...navLinkStyle }} exact to="/login">
                Login
              </NavLink>

              <NavLink style={navLinkStyle} exact to="/register">
                Register
              </NavLink>
            </Fragment>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
