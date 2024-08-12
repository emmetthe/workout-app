import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { signUpAsync } from '../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../slices/errorSlice';
import Spinner from '../spinner/spinner';

export default function Register() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.errors) || [];
  const dispatch = useDispatch();
  localStorage.removeItem('to');

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    re_password: ''
  });
  const [accountCreated, setAccountCreated] = useState(false);
  const areAllFieldsFilled = formData['username'] !== '' && formData['password'] !== '' && formData['re_password'] !== '';
  const { username, password, re_password } = formData;
  const [backDropStatus, setBackdropStatus] = useState(false);

  const openBackdrop = () => {
    setBackdropStatus(true);
  };

  const closeBackdrop = () => {
    setBackdropStatus(false);
  };

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    openBackdrop();
    dispatch(signUpAsync(username, password, re_password)).then(() => {
      if (isAuthenticated) {
        setAccountCreated(true);
      }
      closeBackdrop();
    });
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  } else if (accountCreated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <section
        className="relative z-10 overflow-hidden 
      pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[90px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div
                className="shadow-three mx-auto 
              max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]"
              >
                <h3
                  className="mb-3 text-center text-2xl 
                font-bold text-black dark:text-white sm:text-3xl"
                >
                  Create your account
                </h3>
                {/* border line */}
                <div className="mb-6 flex items-center justify-center">
                  <span
                    className="hidden h-[1px] w-full max-w-[70px]
                   bg-body-color/50 sm:block"
                  ></span>
                </div>

                {/* display error msg */}
                {error.length > 0 && (
                  <div
                    class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50
                   dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    <span class="font-medium">{error}</span>
                  </div>
                )}

                {/* loading spinner starts when calling API */}
                {backDropStatus && <Spinner />}

                {/* register form */}
                <form
                  onSubmit={(e) => {
                    onSubmit(e);
                    openBackdrop();
                  }}
                >
                  <div className="mb-6">
                    <label
                      htmlFor="username"
                      className="mb-3 
                    block text-sm text-dark dark:text-white"
                    >
                      {' '}
                      Username{' '}
                    </label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter your Username"
                      className="
                      border-stroke 
                      dark:text-body-color-dark dark:shadow-two w-full 
                      rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base
                     text-body-color outline-none transition-all duration-300
                      focus:border-primary dark:border-transparent dark:bg-[#2C303B]
                      dark:focus:border-primary dark:focus:shadow-none"
                      onChange={(e) => onChange(e)}
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm text-dark
                     dark:text-white"
                    >
                      {' '}
                      Password{' '}
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your Password"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two 
                      w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base
                       text-body-color outline-none transition-all duration-300
                        focus:border-primary dark:border-transparent dark:bg-[#2C303B] 
                        dark:focus:border-primary dark:focus:shadow-none"
                      onChange={(e) => onChange(e)}
                    />
                  </div>

                  <div className="mb-8">
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm text-dark 
                    dark:text-white"
                    >
                      {' '}
                      Confirm Password{' '}
                    </label>
                    <input
                      type="password"
                      name="re_password"
                      placeholder="Enter your Password"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two 
                      w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base 
                      text-body-color outline-none transition-all duration-300 
                      focus:border-primary dark:border-transparent dark:bg-[#2C303B] 
                      dark:focus:border-primary dark:focus:shadow-none"
                      onChange={(e) => onChange(e)}
                    />
                  </div>

                  {/* submit button, disabled until all fields have been filled */}
                  <div className="mb-6">
                    <button
                      className="enabled:transition enabled:transform shadow-submit 
                      dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm
                     disabled:bg-gray-600 enabled:bg-primary px-9 py-4 text-base 
                      font-medium text-white duration-300 enabled:hover:bg-primary/90"
                      disabled={!areAllFieldsFilled}
                    >
                      Sign up
                    </button>
                  </div>
                </form>

                {/* navigate to login page */}
                <p className="text-center text-base font-medium text-body-color">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* background image */}
        <div className="absolute left-0 top-0 z-[-1]">
          <svg width="1440" height="969" viewBox="0 0 1440 969" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_95:1005" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="969">
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path opacity="0.1" d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z" fill="url(#paint1_linear_95:1005)" />
            </g>
            <defs>
              <linearGradient id="paint0_linear_95:1005" x1="1178.4" y1="151.853" x2="780.959" y2="453.581" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="paint1_linear_95:1005" x1="160.5" y1="220" x2="1099.45" y2="1192.04" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
}
