import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getMyProfile } from '../features/settings/api/settingsApi';

const UpdateInfoModal = ({ onUpdate , onClose}) => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    activityLevel: '',
    fitnessGoal: '',
    weight: '',
    height: '',
  });

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('admin');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        console.log("data of admin", parsedData)
        setForm({
          name: parsedData.name || '',
          age: parsedData.age || '',
          gender: parsedData.gender || '',
          activityLevel: parsedData.activityLevel || '',
          fitnessGoal: parsedData.fitnessGoal || '',
          weight: parsedData.weight || '',
          height: parsedData.height || '',
        });
      } catch (e) {
        console.error('Failed to parse userProfile from localStorage', e);
      }
    }
  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    onUpdate(form);
    const data = await getMyProfile();
    localStorage.setItem('admin', JSON.stringify(data));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-6">
          <h2 className="text-xl font-bold text-[#14919B]">Update Profile Info</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input
              type="number"
              value={form.age}
              onChange={(e) => handleChange('age', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              value={form.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
            <select
              value={form.activityLevel}
              onChange={(e) => handleChange('activityLevel', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
            >
              <option value="">Select Activity Level</option>
              <option value="sedentary">Sedentary</option>
              <option value="active">Active</option>
              <option value="highly active">Highly Active</option>
              
              
            </select>
          </div>

          {/* Fitness Goal */}
            {/* Activity Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fitness Goal</label>
            <select
              value={form.fitnessGoal}
              onChange={(e) => handleChange('fitnessGoal', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
            >
              <option value="">Select Fitness Goal</option>
              <option value="lose weight">Lose weight</option>
              <option value="build muscle">Build muscle</option>
              <option value="highly active">maintain fitness</option>
              
              
            </select>
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
            <input
              type="number"
              value={form.weight}
              onChange={(e) => handleChange('weight', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
            />
          </div>

          {/* Height */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
            <input
              type="number"
              value={form.height}
              onChange={(e) => handleChange('height', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end space-x-3">
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
            Update Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateInfoModal;
