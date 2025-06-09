import { useState, useEffect } from 'react';
import { Plus, Search, Dumbbell, Edit2, Trash2, ChevronRight } from 'lucide-react';
import ExerciseCard from '../../components/ExerciseCard';
import { createExercise, deleteExercise, getAllExercises, updateExercise } from './api/exerciseApi';
import { toast, ToastContainer } from 'react-toastify';
import ExerciseFormModal from '../../components/ExerciseFormModal';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await getAllExercises();
        setExercises(data.data);
      } catch (err) {
        console.error('Failed to fetch exercises:', err);
        toast.error(`Failed to load exercises: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  const filteredExercises = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = async (formData) => {
    try {
      const newExercise = await createExercise(formData);
      setExercises([...exercises, newExercise.data]);
      setShowAddModal(false);
      toast.success('Exercise created successfully!');
    } catch (err) {
      console.error('Failed to create exercise:', err);
      toast.error(`Failed to create exercise: ${err.message}`);
    }
  };

  const handleUpdate = async (id, formData) => {
    try {
      const updatedExercise = await updateExercise(id, formData);
      setExercises(exercises.map(exercise => 
        exercise._id === id ? updatedExercise.data : exercise
      ));
      
      // Update the selectedExercise if it's the one being edited
      if (selectedExercise && selectedExercise._id === id) {
        setSelectedExercise(updatedExercise.data);
      }
      
      toast.success('Exercise updated successfully!');
      return updatedExercise;
    } catch (err) {
      console.error('Failed to update Exercise:', err);
      toast.error(`Failed to update Exercise: ${err.message}`);
      throw err;
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExercise(id);
      setSelectedExercise(null);
      setExercises(exercises.filter(workout => workout._id !== id));
      toast.success('Exercise deleted successfully!');
    } catch (err) {
      console.error('Failed to delete exercise:', err);
      toast.error(`Failed to delete exercise: ${err.message}`);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Sidebar List */}
      <div className={`w-full md:w-[45%] bg-white border-r border-gray-200 ${selectedExercise ? 'hidden md:block' : ''}`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-[#14919B]">Exercises</h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center px-3 py-2 bg-[#ecf87e] text-gray-800 rounded-lg hover:bg-[#d4e86b] transition-colors"
            >
              <Plus size={18} className="mr-1" />
              Add Exercise
            </button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#14919B] focus:border-transparent"
            />
          </div>
        </div>

        {loading ? (
          <LoadingSpinner/>
        ) : filteredExercises.length > 0 ? (
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}>
            {filteredExercises.map((exercise) => (
              <div
                key={exercise._id}
                onClick={() => setSelectedExercise(exercise)}
                className={`p-4 border-b border-gray-200 cursor-pointer transition-colors hover:bg-[#f0fdf4] flex justify-between items-center ${
                  selectedExercise?._id === exercise._id ? 'bg-[#f0fdf4] border-l-4 border-l-[#14919B]' : ''
                }`}
              >
                <div className="flex items-center">
                  {exercise.imageUrl?.[0] ? (
                    <img
                      src={exercise.imageUrl[0]}
                      alt={exercise.name}
                      className="w-12 h-12 rounded-md object-cover mr-3"
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
                <ChevronRight className="text-gray-400" />
              </div>
            ))}
          </div>
        ) : (
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
                onClick={() => setShowAddModal(true)}
                className="mt-4 px-4 font-bold py-2 bg-[#ecf87e] text-gray-800 rounded-lg hover:bg-[#d4e86b] transition-colors"
              >
                <Plus size={16} className="inline mr-1" />
                Add Exercise
              </button>
            )}
          </div>
        )}
      </div>

      {/* Exercise Detail View */}
      {selectedExercise ? (
        <div className="flex-1 overflow-y-auto">
          <ExerciseCard
            key={selectedExercise._id}
            exercise={selectedExercise}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
          <div className="text-center max-w-md">
            <Dumbbell className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-medium text-gray-500">Select an exercise to view details</h2>
            <p className="text-gray-400 mt-2">
              Or create a new exercise by clicking the "Add Exercise" button
            </p>
          </div>
        </div>
      )}

      {/* Exercise Form Modal */}
      {showAddModal && (
        <ExerciseFormModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAdd}
          initialData={null}
        />
      )}
    </div>
  );
};

export default Exercises;