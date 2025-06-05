// src/pages/Login

import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react'
import { useAuth } from '../context/AuthContext' // adjust path as needed
import GradientButton from '../components/GradientButton'
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PasswordInput from '../components/PasswordInput';


export default function AdminLogin() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/dashboard';

    const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password).then(() => {
      // Redirect to the stored path or default
      const redirectPath = localStorage.getItem('redirectPath') || from;
      localStorage.removeItem('redirectPath');
      navigate(redirectPath);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6 animate-fade-in"
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Admin Login</h2>
          <p className="mt-2 text-[#14919B]">Access your fitness dashboard</p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* Email Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          {/* Password Input */}
           <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Your Password"
        showStrengthMeter={false}
        className="mb-4"
      />

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              to='/forgot-password'
              className="text-sm text-gray-500 hover:text-green-600 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {/* Login Button */}
      <GradientButton type="submit">
        <LogIn className="h-5 w-5" />
        Login
      </GradientButton>
      </form>
    </div>
  )
}
