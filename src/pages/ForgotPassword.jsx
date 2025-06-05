import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import GradientButton from '../components/GradientButton';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call to send reset code
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Reset code sent to:', email);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error sending reset code:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg space-y-6 animate-fade-in">
        <button 
          onClick={() => navigate('/login')}
          className="flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to login
        </button>

        <div className="text-center space-y-3">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-50 mb-3">
            <Mail className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Forgot Password?</h2>
          <p className="text-gray-500">
            {isSubmitted 
              ? `We've sent a reset code to ${email}`
              : "Enter your email to receive a reset code"}
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                />
              </div>
            </div>

            <GradientButton
              type="submit"
              isLoading={isLoading}
              className="w-full justify-center py-3 px-4"
            >
              {isLoading ? 'Sending...' : 'Send Reset Code'}
            </GradientButton>
          </form>
        ) : (
          <div className="text-center py-4">
            <div className="mb-4 p-3 inline-flex items-center justify-center rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-600 mb-4">
              Check your inbox for the reset code.
            </p>
            <div className="space-y-4">
              <GradientButton
                onClick={() => navigate(`/reset-password?email=${encodeURIComponent(email)}`)}
                className="w-full justify-center py-3 px-4"
              >
                Enter Reset Code
              </GradientButton>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-sm text-green-600 font-medium hover:underline focus:outline-none"
              >
                Didn't receive code? Try again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}