import { useState, useRef } from 'react';
import { X } from 'lucide-react';

const equipmentOptions = [
  'bodyweight',
  'dumbbell',
  'barbell',
  'machine',
  'resistance band'
];

export const EditExerciseModal = ({ 
  isOpen, 
  onClose, 
  exercise, 
  workoutNames, 
  loadingWorkouts, 
  onSave 
}) => {
  const [formData, setFormData] = useState({
    name: exercise.name,
    description: exercise.description,
    difficulty: exercise.difficulty,
    equipment: exercise.equipment,
    workoutName: exercise.workoutName || ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'image') {
        setImageFile(file);
      } else {
        setVideoFile(file);
      }
    }
  };

  const triggerFileInput = (type) => {
    if (type === 'image') {
      imageInputRef.current.click();
    } else {
      videoInputRef.current.click();
    }
  };

  const removeFile = (type) => {
    if (type === 'image') {
      setImageFile(null);
      imageInputRef.current.value = '';
    } else {
      setVideoFile(null);
      videoInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    
    // Append text fields
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('difficulty', formData.difficulty);
    data.append('equipment', formData.equipment);
    data.append('workoutName', formData.workoutName);
    
    // Append files if they exist
    if (imageFile) {
      data.append('image', imageFile);
    }
    if (videoFile) {
      data.append('video', videoFile);
    }
    
    onSave(data);
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Edit Exercise</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Exercise Image</label>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => triggerFileInput('image')}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {imageFile ? 'Change Image' : 'Upload Image'}
                </button>
                {imageFile && (
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">{imageFile.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile('image')}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  ref={imageInputRef}
                  onChange={(e) => handleFileChange(e, 'image')}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              {!imageFile && exercise.imageUrl?.[0] && (
                <p className="text-sm text-gray-500 mt-2">Current image will be kept if no new image is uploaded</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Exercise Video</label>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => triggerFileInput('video')}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {videoFile ? 'Change Video' : 'Upload Video'}
                </button>
                {videoFile && (
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">{videoFile.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile('video')}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  ref={videoInputRef}
                  onChange={(e) => handleFileChange(e, 'video')}
                  accept="video/*"
                  className="hidden"
                />
              </div>
              {!videoFile && exercise.videoUrl?.[0] && (
                <p className="text-sm text-gray-500 mt-2">Current video will be kept if no new video is uploaded</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
                  required
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Equipment</label>
                <select
                  name="equipment"
                  value={formData.equipment}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
                  required
                >
                  {equipmentOptions.map((option) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Workout Name
              </label>
              <select
                name="workoutName"
                value={formData.workoutName}
                onChange={handleChange}
                disabled={loadingWorkouts}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
              >
                <option value="">Select a workout</option>
                {workoutNames.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#14919B] text-white rounded-lg hover:bg-[#0e6b73] transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};