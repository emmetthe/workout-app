import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';
import Navbar from './components/Navbar';
// import { CssBaseline } from '@material-ui/core';
import SignedOutNotification from './components/sessions/SignOutNotif/SignOutNotif';
import './index.css';

function App() {
  useEffect(() => {
    // Set the dark mode class on the body element
    document.body.classList.add('dark');
  }, []);
  return (
    <>
      {/* <CssBaseline /> */}

      <Router>
        <Navbar />
        <SignedOutNotification />
        {
          <Routes>
            {routes.map((route) => (
              <Route exact key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        }
      </Router>
    </>
  );
}

export default App;
