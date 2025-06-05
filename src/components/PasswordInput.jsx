import { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

const PasswordInput = ({
  value,
  onChange,
  placeholder = 'Enter Password',
  required = true,
  showStrengthMeter = false,
  className = '',
  inputClassName = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  // Password strength calculation
  const getPasswordStrength = (password) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const strength = getPasswordStrength(value);
  const strengthColors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400'];

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
        </div>
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full pl-10 pr-10 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 ${inputClassName}`}
          required={required}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>

      {showStrengthMeter && value && (
        <div className="h-1.5 flex gap-1">
          {[1, 2, 3, 4].map((level) => (
            <div 
              key={level}
              className={`h-full flex-1 rounded-full ${
                level <= strength ? strengthColors[strength - 1] : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PasswordInput;