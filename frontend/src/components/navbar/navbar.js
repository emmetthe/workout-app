import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAsync } from '../../slices/authSlice';

export default function Navbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const menuData = [
    {
      id: 1,
      title: 'Home',
      path: '/',
      newTab: false
    },
    {
      id: 2,
      title: 'Exercises',
      path: '/exercises',
      newTab: false
    }
  ];

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logoutAsync());
  };

  return (
    <>
      <header className={`header flex w-full items-center`}>
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            {/* nav bar logo */}
            {/* <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link to="/hero" className={`header-logo block w-full py-8`}></Link>
            </div> */}

            <div className="flex w-full items-center justify-between px-10">
              <div>
                <nav>
                  <ul className="block lg:flex lg:space-x-12">
                    {menuData.map((menuItem, index) => (
                      <li key={index} className="group relative">
                        {menuItem.path && (
                          <Link
                            to={menuItem.path}
                            className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6  
                              dark:text-white/70 dark:hover:text-white`}
                          >
                            {menuItem.title}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              {/* sign in and logout options if user is authenticated */}
              <div>
                {isAuthenticated ? (
                  // navbar options when user authenticated
                  <div className="flex items-center justify-end pr-16 lg:pr-0">
                    <Link
                      to="/dashboard"
                      className="hidden px-7 py-3 text-base font-medium text-dark 
                      hover:opacity-70 dark:text-white md:block"
                    >
                      Dashboard
                    </Link>
                    <a
                      className="ease-in-up shadow-btn hover:shadow-btn-hover hidden rounded-sm
                    bg-primary px-8 py-3 text-base font-medium text-white transition 
                      duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9"
                      onClick={(e) => handleLogOut(e)}
                      href="#!"
                    >
                      Logout
                    </a>
                  </div>
                ) : (
                  // navbar options when user not authenticated
                  <div className="flex items-center justify-end pr-16 lg:pr-0">
                    <Link
                      to="/login"
                      className="hidden px-7 py-3 text-base font-medium text-dark 
                      hover:opacity-70 dark:text-white md:block"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="ease-in-up shadow-btn hover:shadow-btn-hover hidden rounded-sm
                    bg-primary px-8 py-3 text-base font-medium text-white transition 
                      duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
