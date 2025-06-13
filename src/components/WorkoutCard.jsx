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
        className="bg-white rounded-lg w-full shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-sm border border-gray-200 group flex h-40"
      >
        {/* Image Section (Left Side) */}
        <div className="w-2/5 h-full overflow-hidden relative flex-shrink-0">
          <img 
            src={workout.imageUrl[0]} 
            alt={workout.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-80'}`}></div>
          
          {/* Exercise Count Badge */}
          <div className="absolute bottom-2 left-2 bg-[#14919B]/90 text-white px-2 py-0.5 rounded-full text-xs font-semibold shadow-sm flex items-center">
            <Dumbbell size={12} className="mr-1" />
            <span>{workout.exercises?.length || 0} exercises</span>
          </div>
        </div>
        
        {/* Content Section (Right Side) */}
        <div className="w-3/5 p-3 flex flex-col h-full relative">
          {/* Floating Action Buttons */}
          <div className="absolute top-1 right-1 flex space-x-1">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowEditModal(true);
              }}
              className="p-1 rounded-full bg-[#14919B] text-white hover:bg-white hover:text-[#14919B] hover:border-1 hover:border-[#14919B]transition-all duration-200 border  shadow-sm hover:shadow-md transform hover:scale-105"
            >
              <Edit2 size={14} />
            </button>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteModal(true);
              }}
              className="p-1 bg-red-500 text-white rounded-full hover:bg-white hover:text-red-500 transition-all duration-200 border border-red-500 shadow-sm hover:shadow-md transform hover:scale-105"
            >
              <Trash2 size={14} />
            </button>
          </div>
          
          {/* Workout Title with Animated Underline */}
          <div className="mb-2">
            <h3 className="text-lg font-bold text-gray-800 mb-0.5 relative inline-block">
              {workout.name}
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#ecf87e] transition-all duration-300 ${isHovered ? 'w-full' : 'w-3/4'}`}></span>
            </h3>
          </div>
          
          {/* Description with Fixed Height and Scroll */}
          <div className="flex-grow overflow-y-auto pr-1 mb-2 text-xs">
            <div className="flex items-start">
              <div className="bg-[#14919B]/10 p-1 rounded mr-2 flex-shrink-0">
                <Dumbbell className="text-[#14919B]" size={12} />
              </div>
              <p className="text-gray-600 leading-snug line-clamp-3">
                {workout.description || "No description provided"}
              </p>
            </div>
          </div>
          
          {/* Footer with Last Updated and CTA */}
          <div className="mt-auto pt-1 border-t border-dashed border-gray-200 group-hover:border-gray-300 transition-colors duration-200">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-gray-500 group-hover:text-gray-600 transition-colors duration-200">
                Last updated: {new Date().toLocaleDateString()}
              </span>
              <button className="flex items-center text-xs font-medium text-[#14919B] group-hover:text-[#0e6b73] transition-colors duration-200">
                View Details
                <ChevronRight size={12} className="ml-0.5 transition-transform duration-200 group-hover:translate-x-0.5" />
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