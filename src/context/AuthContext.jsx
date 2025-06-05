// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
 import axios from '../api/axiosInstance'
import { toast } from 'react-toastify';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

const login = async (email, password) => {
  try {
    const res = await axios.post('/users/admin-login', { email, password });
    const token = res.data.data.token;
    console.log(res)
    localStorage.setItem('token', token);
    localStorage.setItem('admin', JSON.stringify(res.data.data));

    toast.success('Login successful');
    setIsAuthenticated(true)
    navigate('/dashboard');
  } catch (error) {
    const msg = error.response?.data?.message || 'Login failed';
    toast.error(msg);
  }
};

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin')
    localStorage.removeItem('token')
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
