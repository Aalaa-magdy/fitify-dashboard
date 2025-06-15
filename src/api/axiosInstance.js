// src/api/axiosInstance.js
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_AWS;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Request interceptor (unchanged)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (!config.headers['Content-Type'] && (config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Enhanced response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Request timeout. Please check your internet connection.'));
    }

    if (!error.response) {
      return Promise.reject(new Error('Network error. Please check your internet connection.'));
    }

    const { status, data } = error.response;
    
    // Handle 401 Unauthorized (special case)
    if (status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return Promise.reject(new Error('Session expired. Please login again.'));
    }

    // Handle backend validation errors (422 or similar)
    if (data?.errors && Array.isArray(data.errors)) {
      // Join all error messages with new lines
      const errorMessage = data.errors.join('\n');
      const validationError = new Error(errorMessage);
      validationError.isValidationError = true;
      validationError.errors = data.errors; // Preserve original errors array
      return Promise.reject(validationError);
    }

    // Handle other error responses with specific messages
    if (data?.message) {
      return Promise.reject(new Error(data.message));
    }

    // Fallback to status-based messages
    const statusMessages = {
      400: 'Bad request',
      403: 'Forbidden',
      404: 'Resource not found',
      409: 'Conflict occurred',
      500: 'Internal server error',
    };
    
    const errorMessage = statusMessages[status] || `Request failed with status ${status}`;
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;