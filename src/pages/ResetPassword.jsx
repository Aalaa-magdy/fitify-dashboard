import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, Key, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import GradientButton from '../components/GradientButton';
import PasswordInput from '../components/PasswordInput';


export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [resetCode, setResetCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Extract email from URL query params
    const searchParams = new URLSearchParams(location.search);
    const emailParam = searchParams.get('email');
    if (emailParam) setEmail(decodeURIComponent(emailParam));
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call to reset password
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Password reset successful for:', email);
      setIsSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg space-y-6 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Password Reset Successful!</h2>
          <p className="text-gray-600">
            Your password has been updated successfully.
          </p>
          <div className="pt-4">
            <GradientButton
              onClick={() => navigate('/login')}
              className="w-full justify-center py-3 px-4"
            >
              Return to Login
            </GradientButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg space-y-6 animate-fade-in">
        <button 
          onClick={() => navigate('/forgot-password')}
          className="flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back
        </button>

        <div className="text-center space-y-3">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 mb-3">
            <Key className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
          <p className="text-gray-500">Enter the code sent to {email} and your new password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="resetCode" className="block text-sm font-medium text-gray-700">
              Reset Code
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Key className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                id="resetCode"
                type="text"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                required
                placeholder="Enter 6-digit code"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-gray-400"
              />
            </div>
          </div>

          <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New Password"
        showStrengthMeter={true}
        className="mb-4"
      />

        <PasswordInput
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="New Password"
        showStrengthMeter={true}
        className="mb-4"
      />

          {error && (
            <div className="text-red-500 text-sm py-2 px-3 bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          <GradientButton
            type="submit"
            isLoading={isLoading}
            className="w-full justify-center py-3 px-4 mt-4"
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </GradientButton>
        </form>
      </div>
    </div>
  );
}