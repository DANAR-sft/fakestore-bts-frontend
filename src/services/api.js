import axios from 'axios';

export const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to attach JWT token if available
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('bts_auth_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for centralized error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If token expired or unauthorized
    if (error.response && error.response.status === 401) {
      // Don't auto clear if trying to login
      if (!error.config.url?.includes('/auth/login')) {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.removeItem('bts_auth_token');
          localStorage.removeItem('bts_auth_user');
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
