import axios from 'axios';
import { getApiUrl } from './functions';
import supabase from './supabase';

const axiosInstance = axios.create({
  baseURL: getApiUrl(),
});

// Function to get the current session token
const getSessionToken = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token;
};

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the current session
    getSessionToken().then((token) => {
      if (token) {
        if (!config.headers) {
          config.headers = {};
        }
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized error
      console.error('Unauthorized access:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export { axiosInstance, getSessionToken };