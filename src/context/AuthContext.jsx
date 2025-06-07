import { createContext, useContext, useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Wait for auth check

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false); // Auth check completed
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('/users/admin-login', { email, password });
      console.log(res);
      const token = res.data.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('admin', JSON.stringify(res.data.data));
      setIsAuthenticated(true);
      toast.success('Login successful');
      return true;
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed';
      toast.error(msg);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
