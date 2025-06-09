import { useState, useEffect } from 'react';
import { X, Upload, Video, Image } from 'lucide-react';
import axios from '../api/axiosInstance';

const ExerciseFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    targetMuscles: '',
    secondaryMuscles: '',
    equipment: 'bodyweight', // Set default value
    difficulty: 'beginner',
    videoFile: null,
    imageFile: null,
    workoutName: ''
  });

  const [workoutNames, setWorkoutNames] = useState([]);
  const [loadingWorkouts, setLoadingWorkouts] = useState(false);

  // Equipment options
  const equipmentOptions = [
    'bodyweight',
    'dumbbell',
    'barbell',
    'machine',
    'resistance band'
  ];

  // Fetch workout names when modal opens
  useEffect(() => {
    if (isOpen) {
      const fetchWorkoutNames = async () => {
        setLoadingWorkouts(true);
        try {
          const response = await axios.get('/workout/list/names');
          setWorkoutNames(response.data.data || []);
        } catch (error) {
          console.error("Failed to fetch workout names:", error);
        } finally {
          setLoadingWorkouts(false);
        }
      };

      fetchWorkoutNames();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ 
        ...prev, 
        [type === 'image' ? 'imageFile' : 'videoFile']: file 
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare FormData to send files
    const data = new FormData();
    
    // Append all text fields
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('targetMuscles', formData.targetMuscles);
    data.append('secondaryMuscles', formData.secondaryMuscles);
    data.append('equipment', formData.equipment);
    data.append('difficulty', formData.difficulty);
    data.append('workoutName', formData.workoutName);
    
    // Append files if they exist
    if (formData.imageFile) {
      data.append('image', formData.imageFile);
    }
    if (formData.videoFile) {
      data.append('video', formData.videoFile);
    }
    
    onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#14919B]">
            {initialData ? 'Edit Exercise' : 'Add New Exercise'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Exercise Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
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
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
                  />
                </div>

                {/* Target Muscles */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Muscles (comma separated)*
                  </label>
                  <input
                    type="text"
                    name="targetMuscles"
                    value={formData.targetMuscles}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
                  />
                </div>

                {/* Secondary Muscles */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Secondary Muscles (comma separated)
                  </label>
                  <input
                    type="text"
                    name="secondaryMuscles"
                    value={formData.secondaryMuscles}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Equipment - Updated to select dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Equipment*
                  </label>
                  <select
                    name="equipment"
                    value={formData.equipment}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
                  >
                    {equipmentOptions.map((option) => (
                      <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Difficulty*
                  </label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                {/* Workout Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Workout Name*
                  </label>
                  <select
                    name="workoutName"
                    value={formData.workoutName}
                    onChange={handleChange}
                    required
                    disabled={loadingWorkouts}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
                  >
                    <option value="">Select a workout</option>
                    {workoutNames.map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Exercise Image
                  </label>
                  <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <div className="flex flex-col items-center justify-center">
                      <Upload className="h-8 w-8 text-[#14919B] mb-2" />
                      <p className="text-sm text-gray-500">
                        {formData.imageFile ? formData.imageFile.name : 'Click to upload image'}
                      </p>
                    </div>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'image')}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Video Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Exercise Video
                  </label>
                  <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <div className="flex flex-col items-center justify-center">
                      <Video className="h-8 w-8 text-[#14919B] mb-2" />
                      <p className="text-sm text-gray-500">
                        {formData.videoFile ? formData.videoFile.name : 'Click to upload video'}
                      </p>
                    </div>
                    <input 
                      type="file" 
                      accept="video/*"
                      onChange={(e) => handleFileChange(e, 'video')}
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
                {initialData ? 'Update Exercise' : 'Create Exercise'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExerciseFormModal;