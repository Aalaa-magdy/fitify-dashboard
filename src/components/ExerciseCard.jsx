import { useState } from 'react';
import { Edit2, Trash2, ChevronLeft, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DeleteModal } from './DeleteModal';
import { EditExerciseModal } from './EditExerciseModal';
import axios from '../api/axiosInstance';

const ExerciseCard = ({ exercise, onDelete, onUpdate }) => {
  const navigate = useNavigate();
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [workoutNames, setWorkoutNames] = useState([]);
  const [loadingWorkouts, setLoadingWorkouts] = useState(false);

  const handleEditClick = async () => {
    setLoadingWorkouts(true);
    try {
      const response = await axios.get('/workout/list/names');
      setWorkoutNames(response.data.data || []);
      setShowEditModal(true);
    } catch (error) {
      console.error("Failed to fetch workout names:", error);
    } finally {
      setLoadingWorkouts(false);
    }
  };

  const handleUpdate = async (id, formData) => {
    try {
      const updatedExercise = await onUpdate(id, formData);
      setShowEditModal(false);
      return updatedExercise;
    } catch (error) {
      console.error("Failed to update exercise:", error);
      throw error;
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(exercise._id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Failed to delete exercise:", error);
    }
  };

  return (
    <div className="w-[90%] ml-8 bg-white p-3 rounded-xl">
      {/* Header with Back Button */}
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-[#14919B] hover:text-[#0e6b73] transition-colors"
        >
          <ChevronLeft className="mr-1" />
          Back to Exercises
        </button>
        
        <div className="flex space-x-3">
          <button
            onClick={handleEditClick}
            className="px-4 py-2 bg-[#14919B] text-white hover:bg-white hover:text-[#14919B] hover:border-1 hover:border-[#14919B]  rounded-lg flex items-center  transition-colors"
          >
            <Edit2 size={18} className="mr-2" />
            Edit
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center hover:bg-red-600 transition-colors"
          >
            <Trash2 size={18} className="mr-2" />
            Delete
          </button>
        </div>
      </div>

      {/* Exercise Content */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        {/* Image and Video Section */}
        <div className="relative">
          {exercise.imageUrl?.[0] && (
            <img 
              src={exercise.imageUrl[0]} 
              alt={exercise.name}
              className="w-[70%] h-96 overflow-hidden mx-auto"
            />
          )}
          
          {exercise.videoUrl?.[0] && (
            <div className="absolute bottom-4 right-4">
              <a 
                href={exercise.videoUrl[0]} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-[#14919B] text-white rounded-lg hover:bg-[#0e6b73] transition-colors"
              >
                <Play className="mr-2" size={16} />
                Watch Video
              </a>
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{exercise.name}</h1>
          <p className="text-gray-600 mb-6">{exercise.description}</p>
          
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-4 rounded-lg border border-[#14919B]/20">
              <h3 className="text-sm font-medium text-[#14919B] mb-1">Difficulty</h3>
              <p className="text-lg capitalize">{exercise.difficulty}</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-[#14919B]/20">
              <h3 className="text-sm font-medium text-[#14919B] mb-1">Equipment</h3>
              {console.log(exercise)}
              <p className="text-lg capitalize">{exercise.equipment}</p>
            </div>

            {exercise.workoutName && (
              <div className="bg-white p-4 rounded-lg border border-[#14919B]/20">
                <h3 className="text-sm font-medium text-[#14919B] mb-1">Workout</h3>
                <p className="text-lg">{exercise.workoutName}</p>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="w-2 h-2 bg-[#14919B] rounded-full mr-2"></span>
                Target Muscles
              </h3>
              <div className="flex flex-wrap gap-2">
                {exercise.targetMuscles.map((muscle, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-[#14919B]/10 text-[#14919B] rounded-full text-sm font-medium"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>
            
            {exercise.secondaryMuscles?.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-[#14919B] rounded-full mr-2"></span>
                  Secondary Muscles
                </h3>
                <div className="flex flex-wrap gap-2">
                  {exercise.secondaryMuscles.map((muscle, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-[#ecf87e]/30 text-gray-800 rounded-full text-sm font-medium"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDelete}
          title="Delete Exercise"
          message={`Are you sure you want to delete "${exercise.name}"? This action cannot be undone.`}
        />
      )}  

      {/* Edit Exercise Modal */}
      <EditExerciseModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        exercise={exercise}
        workoutNames={workoutNames}
        loadingWorkouts={loadingWorkouts}
        onSave={(formData) => handleUpdate(exercise._id, formData)}
      />
    </div>
  );
};

export default ExerciseCard;