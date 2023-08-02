import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const authLinks = (
    <Fragment>
      <h1>Authenticated</h1>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <h5>
        Click to <Link to="/login">Login</Link>
      </h5>
    </Fragment>
  );

  return (
    <div className="container">
      <h1>Home Page Component</h1>
      <div>{isAuthenticated ? authLinks : guestLinks}</div>
    </div>
  );
};

export default Home;
