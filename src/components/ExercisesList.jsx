import { Plus, Search, Dumbbell } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import ExerciseListItem from './ExerciseListItem';

const ExercisesList = ({
  filteredExercises,
  selectedExercise,
  searchTerm,
  loading,
  onSearchChange,
  onExerciseSelect,
  onAddExercise
}) => {
  return (
    <div className={`w-full md:w-[45%] ${selectedExercise ? 'hidden md:block' : ''}`}>
      {/* Header Section */}
      <div className=" border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl text-black font-bold">Exercises</h1>
          <button
            onClick={onAddExercise}
            className="flex items-center px-3 py-2 bg-[#14919B] text-white rounded-lg  transition-colors"
          >
            <Plus size={18} className="mr-1" />
            Add Exercise
          </button>
        </div>
        
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={onSearchChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#14919B] focus:border-transparent"
          />
        </div>
      </div>

      {/* Exercises List */}
      {loading ? (
        <LoadingSpinner/>
      ) : filteredExercises.length > 0 ? (
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}>
          {filteredExercises.map((exercise) => (
            <ExerciseListItem
              key={exercise._id}
              exercise={exercise}
              isSelected={selectedExercise?._id === exercise._id}
              onClick={() => onExerciseSelect(exercise)}
            />
          ))}
        </div>
      ) : (
        <EmptyState 
          searchTerm={searchTerm} 
          onAddExercise={onAddExercise}
        />
      )}
    </div>
  );
};

const EmptyState = ({ searchTerm, onAddExercise }) => (
  <div className="p-8 text-center">
    <Dumbbell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
    <h3 className="text-lg font-medium text-gray-900">
      {searchTerm ? 'No matching exercises found' : 'No exercises yet'}
    </h3>
    <p className="text-gray-500 mt-1">
      {searchTerm ? 'Try a different search term' : 'Create your first exercise'}
    </p>
    {!searchTerm && (
      <button
        onClick={onAddExercise}
        className="mt-4 px-4 font-bold py-2 bg-[#ecf87e] text-gray-800 rounded-lg hover:bg-[#d4e86b] transition-colors"
      >
        <Plus size={16} className="inline mr-1" />
        Add Exercise
      </button>
    )}
  </div>
);

export default ExercisesList;