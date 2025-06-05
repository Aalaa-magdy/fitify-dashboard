// src/api/axiosInstance.js
import axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_AWS;

console.log('✅ Axios baseURL:', BASE_URL)

const axiosInstance = axios.create({
  baseURL: BASE_URL, 
})

// 🔐 Add token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 🚨 Handle global response errors
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
