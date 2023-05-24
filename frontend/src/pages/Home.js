import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { fetchTasksAsync } from '../slices/taskSlice';

const Home = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const profile = useSelector((state) => state.auth.profile);
  // const dispatch = useDispatch();
  // const filterInputRef = useRef();
  // const handleSearch = () => {
  //   const enteredFilter = filterInputRef.current.value;
  //   dispatch(fetchTasksAsync(enteredFilter));
  // };

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
