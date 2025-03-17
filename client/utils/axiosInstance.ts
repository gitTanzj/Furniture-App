import axios from 'axios';
import { getApiUrl } from './functions';
import supabase from './supabase';

const axiosInstance = axios.create({
  baseURL: getApiUrl(),
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.access_token) {
        if (!config.headers) {
          config.headers = {};
        }
        config.headers['Authorization'] = `Bearer ${session.access_token}`;
      }
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;