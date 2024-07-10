import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';
// import Navbar from './components/Navbar';
import SignedOutNotification from './components/sessions/SignOutNotif/SignOutNotif';
import './index.css';
import Navbar from './components/navbar/navbar';
import ScrollToTop from './components/scrollToTop';

function App() {
  useEffect(() => {
    // Set the dark mode class on the body element
    document.body.classList.add('dark');
  }, []);
  return (
    <>
      <Router>
        <Navbar />
        {/* <Navbar /> */}
        <ScrollToTop />
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
