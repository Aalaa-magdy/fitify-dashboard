import { useState } from 'react';
import ExercisesMenu from './ExercisesMenu.jsx'; // We'll create this next

const WorkoutCard = ({ workout }) => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="relative">
      <div 
        onClick={toggleMenu}
        className="bg-white w-[84%] rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 hover:shadow-lg"
      >
        {/* Workout Image */}
        <div className="h-48 overflow-hidden">
          <img 
            src={workout.imageUrl[0]} 
            alt={workout.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Workout Info */}
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{workout.name}</h3>
          <p className="text-gray-600 line-clamp-2">{workout.description}</p>
        </div>
      </div>

      {/* Exercises Menu */}
      {showMenu && (
        <ExercisesMenu 
          workout={workout} 
          onClose={() => setShowMenu(false)}
        />
      )}
    </div>
  );
};

export default WorkoutCard;