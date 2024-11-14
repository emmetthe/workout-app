import React, { useState, useEffect  } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAsync } from '../../slices/authSlice';

export default function Navbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuData = [
    // { id: 1, title: 'Home', path: '/', newTab: false },
    { id: 2, title: 'Exercises', path: '/exercises', newTab: false }
  ];

  const location = useLocation();
  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logoutAsync());
    setIsMobileMenuOpen(false); // Close menu after logout
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4 md:py-6">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/images/logo.png" alt="Logo" className="w-12 h-10" /> {/* Adjust width and height as needed */}
          </Link>

          {/* Mobile Menu Button */}
          <button className="text-gray-500 dark:text-white lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              ></path>
            </svg>
          </button>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex lg:space-x-4">
            {menuData.map((menuItem) => (
              <Link key={menuItem.id} to={menuItem.path} className="text-gray-800 dark:text-white hover:text-primary">
                {menuItem.title}
              </Link>
            ))}
          </nav>

          {/* Auth Links */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-800 dark:text-white hover:text-primary">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogOut}
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-800 dark:text-white hover:text-primary">
                  Sign In
                </Link>
                <Link to="/register" className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition duration-300">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <nav className="flex flex-col space-y-2 p-4 bg-white dark:bg-gray-800">
            {menuData.map((menuItem) => (
              <Link key={menuItem.id} to={menuItem.path} className="text-gray-800 dark:text-white hover:text-primary">
                {menuItem.title}
              </Link>
            ))}

            <div className="flex flex-col space-y-2 mt-4">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="text-gray-800 dark:text-white hover:text-primary">
                    Dashboard
                  </Link>
                  <button onClick={handleLogOut} className="text-gray-800 dark:text-white hover:text-primary text-left">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-800 dark:text-white hover:text-primary">
                    Sign In
                  </Link>
                  <Link to="/register" className="hover:text-primary dark:text-white">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
