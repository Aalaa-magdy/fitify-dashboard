import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  ArrowLeft } from 'lucide-react';
import GradientButton from '../components/GradientButton';
import PasswordInput from '../components/PasswordInput';
import axios from '../api/axiosInstance'
import { toast } from 'react-toastify';

export default function ResetPassword() {
  const navigate = useNavigate();

  // Form step: 1 = verify code, 2 = set new password
  const [step, setStep] = useState(1);

  // Step 1 state
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Step 2 state
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isResetting, setIsResetting] = useState(false);

  // Shared
  
  const [successMessage, setSuccessMessage] = useState('');

  // Step 1: Verify email + reset code
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setIsVerifying(true);

    try {
      
     const response = await axios.post('/users/check-otp', { email, resetCode });
     console.log(response)
      setStep(2);
    } catch (err) {
      toast.error(err.message || 'Failed to verify reset code.');
     
    } finally {
      setIsVerifying(false);
    }
  };

  // Step 2: Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    if (!password || !confirmPassword) {
      toast.error('Please fill in both password fields.');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setIsResetting(true);

    try {
      const response = await axios.post("/users/reset-password",{email, newPassword: password})
      console.log(response);

      setSuccessMessage('Password reset successful! Redirecting to login...');
      
      // Optional: Redirect after a delay
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err) {
      toast.error(err.message || 'Failed to reset password.');
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg space-y-6 animate-fade-in">
        
        {step === 1 && (
          <>
            <button
              onClick={() => navigate('/forgot-password')}
              className="flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back
            </button>
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Verify Reset Code</h2>
            <form onSubmit={handleVerifyCode} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
                />
              </div>

              <div>
                <label htmlFor="resetCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Reset Code
                </label>
                <input
                  id="resetCode"
                  type="text"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  required
                  placeholder="Enter the code sent to your email"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
                />
              </div>


              <GradientButton
                type="submit"
                className="w-full py-3 px-4 justify-center"
              >
                {isVerifying ? 'Verifying...' : 'Verify Code'}
              </GradientButton>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <button
              onClick={() => setStep(1)}
              className="flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to Code Verification
            </button>

            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Set New Password</h2>
            <form onSubmit={handleResetPassword} className="space-y-5">
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
                placeholder="Confirm New Password"
                showStrengthMeter={true}
                className="mb-4"
              />

              {successMessage && (
                <div className="text-green-600 text-sm bg-green-50 rounded p-2">{successMessage}</div>
              )}

              <GradientButton
                type="submit"
                className="w-full py-3 px-4 justify-center"
              >
                {isResetting ? 'Resetting Password...' : 'Reset Password'}
              </GradientButton>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
