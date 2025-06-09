import { useState } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import GradientButton from './GradientButton.jsx';

export const AddModal = ({ 
  onAdd, 
  onClose 
}) => {
  const [workoutData, setWorkoutData] = useState({
    name: '',
    description: '',
    imageFile: null
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setWorkoutData({...workoutData, imageFile: file});
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('name', workoutData.name);
    formData.append('description', workoutData.description);
    if (workoutData.imageFile) {
      formData.append('image', workoutData.imageFile);
    }

    onAdd(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#14919B]">Create New Workout</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Workout Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Workout Name*
                </label>
                <input
                  type="text"
                  value={workoutData.name}
                  onChange={(e) => setWorkoutData({...workoutData, name: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description*
                </label>
                <textarea
                  value={workoutData.description}
                  onChange={(e) => setWorkoutData({...workoutData, description: e.target.value})}
                  rows={3}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Workout Image
                </label>
                <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  {previewImage ? (
                    <div className="relative w-full h-40">
                      <img 
                        src={previewImage} 
                        alt="Preview" 
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <Upload className="h-8 w-8 text-[#14919B] mb-2" />
                      <p className="text-sm text-gray-500">
                        {workoutData.imageFile ? workoutData.imageFile.name : 'Click to upload image'}
                      </p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          <button
                type="submit"
                className="px-6 py-2 bg-[#14919B] text-white rounded-lg hover:bg-[#0e6b73] transition-colors"
                onClick={handleSubmit}
              >
                { 'Create New Workout'}
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};