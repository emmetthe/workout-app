import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Create an Axios instance with a request interceptor
const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('token');

    if (accessToken) {
      // Check if the access token is expired or not
      const expiration = jwtDecode(accessToken).exp * 1000; // Convert to milliseconds
      const currentTime = new Date().getTime();

      if (expiration < currentTime) {
        // Access token is expired, try to refresh
        await refreshAccessToken();
      }

      config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/token/refresh/`, { refresh: refreshToken });
    const newAccessToken = response.data.access;

    // Update the local storage with the new access token
    localStorage.setItem('token', newAccessToken);

    // Update the default headers with the new access token
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
  } catch (error) {
    // Handle refresh token expiration or other errors
    console.error('Error refreshing access token:', error);
    // Redirect user to login page or handle another way
  }
};

export default axiosInstance;
