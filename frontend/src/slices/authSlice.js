import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { receiveErrors, clearErrors } from './errorSlice';
import axiosInstance from '../utils/axiosInstance';

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
export const LoadUserAsync = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/profile/user/`);
    dispatch(loadUserProfile(response.data));
  } catch (error) {
    console.error('LoadUserAsync error: ', error);
    throw error;
  }
};

/**
 * PUT '/profile/update/'
 * - updates user profile
 * @params first name, last name, city, phone
 * @returns none
 */
export const UpdateProfileAsync = createAsyncThunk('auth/update_user', async (profile_object) => {
  const body = {
    first_name: profile_object['firstName'],
    last_name: profile_object['lastName'],
    bodyWeight: profile_object['bodyWeight']
  };

  return axiosInstance.put(`/profile/update/`, body).then((response) => response.data);
});

/**
 * GET '/users/is_authenticated'
 * - authenticates current user and modifies redux store
 */
export const checkAuthenticatedAsync = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`/users/is_authenticated`);
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
  try {
    const res = await axiosInstance.post(`/users/login/`, { username, password });
    if (res.data.success === 'User authenticated') {
      const res = await axiosInstance.post(`/token/`, { username, password });
      const { access, refresh } = res.data;

      // add token to local storage
      localStorage.setItem('token', access);
      localStorage.setItem('refresh_token', refresh);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;

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
  try {
    const refreshToken = localStorage.getItem('refresh_token');

    await axiosInstance.post(`/users/logout/`, { refresh: refreshToken });
    dispatch(logout());
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token');
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
  const body = { username, password, re_password };

  try {
    const res = await axiosInstance.post(`/users/signup/`, body);

    if (res.data.success === 'User created successfully') {
      dispatch(clearErrors());
      dispatch(signup(res.data));

      // automatically sign in after registering
      dispatch(loginAsync(username, password));
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
  try {
    await axiosInstance.delete(`/accounts/delete/`);
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
    },
    loadUserProfile: (state, action) => {
      state.profile = action.payload.profile;
      state.username = action.payload.username;
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
export const { login, logout, signup, deleteAccount, is_authenticated, loadUserProfile } = authSlice.actions;

/**
 * reducer for user auth
 */
export default authSlice.reducer;
