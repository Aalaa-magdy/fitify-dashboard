import { useState } from 'react';
import { X } from 'lucide-react';
import PasswordInput from './PasswordInput'; // Make sure this path matches your project

const ChangePasswordModal = ({ onChangePassword, onClose }) => {
  const [form, setForm] = useState({
    currentPassword: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setError('');
  };

  const handleSubmit = () => {
    if (!form.currentPassword || !form.password || !form.confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    // Send passwords to parent handler
    onChangePassword(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6 space-y-4 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-bold text-[#14919B]">Change Password</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Password Fields */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Current Password
          </label>
          <PasswordInput
            value={form.currentPassword}
            onChange={(e) => handleChange('currentPassword', e.target.value)}
            placeholder="Enter current password"
            showStrengthMeter={false}
            className="mb-4"
          />

          <label className="text-sm font-medium text-gray-700 block mb-1">
            New Password
          </label>
          <PasswordInput
            value={form.password}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="Enter new password"
            showStrengthMeter={true}
            className="mb-4"
          />

          <label className="text-sm font-medium text-gray-700 block mb-1">
            Confirm New Password
          </label>
          <PasswordInput
            value={form.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            placeholder="Confirm new password"
            showStrengthMeter={true}
            className="mb-2"
          />

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Actions */}
        <div className="pt-4 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-[#14919B] text-white rounded-lg hover:bg-[#0e6b73] transition"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
