import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { receiveErrors, clearErrors } from './errorSlice';

const initialState = {
  isAuthenticated: null,
  profile: [],
  username: ''
};

/**
 * GET '/profile/user' to retrieve user data
 *
 * generates action types:
 * - pending: 'auth/load_user/pending'
 * - fulfilled: 'auth/load_user/fulfilled'
 * - rejected: 'auth/load_user/rejected'
 * @returns user data
 */
export const LoadUserAsync = createAsyncThunk('auth/load_user', async () => {
  return axios.get('/profile/user').then((response) => {
    return response.data;
  });
});

/**
 * PUT '/profile/update/'
 * - updates user profile
 * @params first name, last name, city, phone
 * @returns none
 */
export const UpdateProfileAsync = createAsyncThunk('auth/update_user', async (profile_object) => {
  const body = JSON.stringify({
    withCredentials: true,
    first_name: profile_object['firstName'],
    last_name: profile_object['lastName'],
    bodyWeight: profile_object['bodyWeight']
  });

  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken')
    }
  };

  return axios.put('/profile/update/', body, config).then((response) => response.data);
});

/**
 * GET '/users/is_authenticated'
 * - authenticates current user and modifies redux store
 */
export const checkAuthenticatedAsync = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.get('/users/is_authenticated', config);
    if (res.data.error || res.data.isAuthenticated === 'error') {
      dispatch(is_authenticated(false));
    } else if (res.data.isAuthenticated === 'success') {
      dispatch(is_authenticated(true));
    } else {
      dispatch(is_authenticated(false));
    }
  } catch (err) {
    dispatch(receiveErrors(err.message));
  }
};

/**
 * POST '/users/is_authenticated'
 * - Creates POST request to allow user sign in
 * @requires CSRFToken, User Authenticated
 * @params username, password
 * @returns none
 */
export const loginAsync = (username, password) => async (dispatch) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken')
    }
  };

  const body = JSON.stringify({ username, password });
  try {
    const res = await axios.post('/users/login/', body, config);

    if (res.data.success === 'User authenticated') {
      dispatch(clearErrors());
      dispatch(login(res.data));
      dispatch(LoadUserAsync());
    } else {
      dispatch(receiveErrors(res.data.error));
    }
  } catch (err) {
    dispatch(receiveErrors(err.message));
  }
};

/**
 * POST '/users/logout'
 * - Creates POST request to sign out user
 * @requires CSRFToken, User Authenticated
 */
export const logoutAsync = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken')
    }
  };

  const body = JSON.stringify({
    withCredentials: true
  });

  try {
    const res = await axios.post('/users/logout/', body, config);
    dispatch(logout(res.data));
    window.localStorage.removeItem('to');
  } catch (err) {
    dispatch(receiveErrors(err.message));
  }
};

/**
 * POST '/users/signup/'
 * - Creates POST request to register user
 * @requires CSRFToken
 * @params username, password, confirm password
 * @returns none
 */
export const signUpAsync = (username, password, re_password) => async (dispatch) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken')
    }
  };

  const body = JSON.stringify({ username, password, re_password });

  try {
    const res = await axios.post('/users/signup/', body, config);

    if (res.data.success === 'User created successfully') {
      dispatch(clearErrors());
      dispatch(signup(res.data));

      // automatically sign in after registering
      const loginData = await axios.post('/users/login/', { username, password }, config);
      dispatch(login(loginData.data));
      dispatch(LoadUserAsync());
    } else {
      dispatch(receiveErrors(res.data.error));
    }
  } catch (err) {
    dispatch(receiveErrors(err.message));
  }
};

/**
 * DEL '/accounts/delete/'
 * - Permanently removes current user's account
 * @requires CSRFToken
 */
export const delAccountAsync = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken')
    }
  };

  const body = JSON.stringify({
    withCredentials: true
  });

  try {
    await axios.delete('/accounts/delete/', config, body);
    dispatch(deleteAccount());
  } catch (err) {
    dispatch(receiveErrors(err.message));
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.profile = [];
      state.username = '';
    },
    signup: (state) => {
      state.isAuthenticated = false;
    },
    deleteAccount: (state) => {
      state.isAuthenticated = false;
      state.profile = [];
      state.username = '';
    },
    is_authenticated: (state, action) => {
      state.isAuthenticated = true;
    }
  },

  extraReducers: {
    [LoadUserAsync.fulfilled]: (state, action) => {
      state.profile = action.payload.profile;
      state.username = action.payload.username;
    },

    [LoadUserAsync.rejected]: (state, action) => {
      state.profile = [];
    },

    [UpdateProfileAsync.fulfilled]: (state, action) => {
      state.profile = action.payload.profile;
      state.username = action.payload.username;
      state.firstName = action.payload.profile.first_name;
      state.lastName = action.payload.profile.last_name;
    }
  }
});

/**
dispatched inside components and other async functions
*/
export const { login, logout, signup, deleteAccount, is_authenticated } = authSlice.actions;

/**
 * reducer for user auth
 */
export default authSlice.reducer;
