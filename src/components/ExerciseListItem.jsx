import { ChevronRight, Dumbbell } from 'lucide-react';

const ExerciseListItem = ({ exercise, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 border-b border-gray-200 cursor-pointer transition-colors hover:bg-[#f0fdf4] flex justify-between items-center ${
        isSelected ? 'bg-[#f0fdf4] border-l-4 border-l-[#14919B]' : ''
      }`}
    >
      <div className="flex items-center">
        {exercise.imageUrl?.[0] ? (
          <img
            src={exercise.imageUrl[0]}
            alt={exercise.name}
            className="w-16 h-14 rounded-md object-cover mr-3"
          />
        ) : (
          <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center mr-3">
            <Dumbbell className="h-6 w-6 text-gray-400" />
          </div>
        )}
        <div>
          <h3 className="font-medium text-gray-900">{exercise.name}</h3>
          <p className="text-sm text-gray-500 truncate max-w-xs">
            {exercise.description}
          </p>
        </div>
      </div>
      <ChevronRight className="text-gray-400 group-hover:text-[#14919B] transition-colors" />
    </div>
  );
};

export default ExerciseListItem;