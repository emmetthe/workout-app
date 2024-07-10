import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAsync } from '../slices/authSlice';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button } from '@mui/material';

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logoutAsync());
  };

  const navLinkStyle = {
    textDecoration: 'none',
    marginRight: '16px',
    marginLeft: '16px'
  };

  const buttonGroupStyle = {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  };

  const listStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  };

  const appBarStyle = {
    alignItems: 'center',
    backgroundColor: 'transparent',
    boxShadow: 'none'
  };

  return (
    <AppBar position="static" sx={appBarStyle}>
      <Toolbar sx={{ width: '73vw' }}>
        <div>
          <div style={listStyle}>
            <div>
              <NavLink style={{ ...navLinkStyle }} exact to="/">
                Home
              </NavLink>
            </div>
            <div>
              <NavLink style={navLinkStyle} exact to="/exercises">
                Find Exercises
              </NavLink>
            </div>
          </div>
        </div>

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
              <Button variant="contained">
                <NavLink style={{ ...navLinkStyle }} exact to="/login">
                  Login
                </NavLink>
              </Button>

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
