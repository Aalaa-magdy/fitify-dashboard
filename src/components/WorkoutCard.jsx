import { useState } from 'react';
import { Edit2, Trash2, Dumbbell, ChevronRight } from 'lucide-react';
import ExercisesMenu from './ExercisesMenu';
import { EditModal } from './EditModal.jsx';
import { DeleteModal } from './DeleteModal.jsx';
import { columns } from '../features/workouts/constants/columns.js';

const WorkoutCard = ({ workout, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const [workoutData, setWorkoutData] = useState({
    name: workout?.name || '',
    description: workout?.description || '',
    imageUrl: workout?.imageUrl?.[0] || ''
  });

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleEdit = () => {
    onEdit(workout._id, workoutData);
    setShowEditModal(false);
  };

  const handleDelete = () => {
    onDelete(workout._id);
    setShowDeleteModal(false);
  };

  return (
    <div className="relative">
      <div 
        onClick={toggleMenu}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-white rounded-2xl w-full max-w-3xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl border-2 border-gray-100 group flex h-64"
      >
        {/* Image Section (Left Side) */}
        <div className="w-2/5 h-full overflow-hidden relative flex-shrink-0">
          <img 
            src={workout.imageUrl[0]} 
            alt={workout.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-80'}`}></div>
          
          {/* Exercise Count Badge */}
          <div className="absolute bottom-4 left-4 bg-[#14919B]/90 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md flex items-center">
            <Dumbbell size={14} className="mr-1" />
            <span>{workout.exercises?.length || 0} exercises</span>
          </div>
        </div>
        
        {/* Content Section (Right Side) */}
        <div className="w-3/5 p-6 flex flex-col h-full relative">
          {/* Floating Action Buttons - Removed hover conditional */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowEditModal(true);
              }}
              className="p-2 bg-[#ecf87e] text-gray-800 rounded-full hover:bg-white hover:text-[#daec35] transition-all duration-300 border-2 border-[#daec35] shadow-md hover:shadow-lg transform hover:scale-110"
            >
              <Edit2 size={16} />
            </button>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteModal(true);
              }}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-white hover:text-red-500 transition-all duration-300 border-2 border-red-500 shadow-md hover:shadow-lg transform hover:scale-110"
            >
              <Trash2 size={16} />
            </button>
          </div>
          
          {/* Workout Title with Animated Underline */}
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-1 relative inline-block">
              {workout.name}
              <span className={`absolute bottom-0 left-0 h-1 bg-[#ecf87e] transition-all duration-500 ${isHovered ? 'w-full' : 'w-3/4'}`}></span>
            </h3>
          </div>
          
          {/* Description with Fixed Height and Scroll */}
          <div className="flex-grow overflow-y-auto pr-2 mb-4">
            <div className="flex items-start">
              <div className="bg-[#14919B]/10 p-2 rounded-lg mr-3 flex-shrink-0">
                <Dumbbell className="text-[#14919B]" size={16} />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {workout.description || "No description provided"}
              </p>
            </div>
          </div>
          
          {/* Footer with Last Updated and CTA */}
          <div className="mt-auto pt-3 border-t border-dashed border-gray-200 group-hover:border-gray-300 transition-colors duration-300">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                Last updated: {new Date().toLocaleDateString()}
              </span>
              <button className="flex items-center text-sm font-medium text-[#14919B] group-hover:text-[#0e6b73] transition-colors duration-300">
                View Details
                <ChevronRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Exercises Menu */}
      {showMenu && (
        <ExercisesMenu 
          workout={workout} 
          onClose={() => setShowMenu(false)}
        />
      )}

      {/* Modals */}
      {showEditModal && (
        <EditModal
          data={workoutData}
          setData={setWorkoutData}
          columns={columns}
          onSave={handleEdit}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          onDelete={handleDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default WorkoutCard;