import { useState } from 'react';
import { Edit2, Trash2, Plus, X, Dumbbell } from 'lucide-react';
import ExercisesMenu from './ExercisesMenu';
import { EditModal } from './EditModal.jsx';
import { DeleteModal } from './DeleteModal.jsx';
import { columns } from '../features/workouts/constants/columns.js';

const WorkoutCard = ({ workout, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
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
        className="bg-white rounded-2xl w-[70%] shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 border-gray-100 group"
      >
        {/* Workout Image with Gradient Overlay */}
        <div className="h-48 overflow-hidden relative">
          <img 
            src={workout.imageUrl[0]} 
            alt={workout.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
          
          {/* Floating Action Buttons */}
          <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowEditModal(true);
              }}
              className="p-2 bg-[#ecf87e] text-gray-800 rounded-lg hover:bg-white hover:text-[#daec35] transition-all duration-300 border-2 border-[#daec35] shadow-md hover:shadow-lg"
            >
              <Edit2 size={18} />
            </button>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteModal(true);
              }}
              className="p-2 bg-red-500 text-white rounded-lg hover:bg-white hover:text-red-500 transition-all duration-300 border-2 border-red-500 shadow-md hover:shadow-lg"
            >
              <Trash2 size={18} />
            </button>
          </div>
          
          {/* Workout Name Badge */}
          <div className="absolute bottom-4 left-4 bg-[#14919B]/90 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
            {workout.name}
          </div>
        </div>
        
        {/* Workout Info */}
        <div className="p-5 transition-all duration-300 group-hover:bg-gray-50/70">
          <div className="flex items-start mb-3">
            <Dumbbell className="text-[#14919B] mt-1 mr-2 flex-shrink-0" size={18} />
            <p className="text-gray-600 line-clamp-3 group-hover:text-gray-800 transition-colors text-sm leading-relaxed">
              {workout.description || "No description provided"}
            </p>
          </div>
          
          {/* Exercise Count Indicator */}
          <div className="mt-3 pt-3 border-t border-dashed border-gray-200 group-hover:border-gray-300 transition-colors">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors">
                {workout.exercises?.length || 0} exercises
              </span>
              <span className="text-xs font-medium text-[#14919B] group-hover:text-[#0e6b73] transition-colors">
                View Details →
              </span>
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