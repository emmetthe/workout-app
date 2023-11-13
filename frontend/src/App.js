import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';
import Navbar from './components/Navbar';
import { CssBaseline } from '@material-ui/core';

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Navbar />
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
