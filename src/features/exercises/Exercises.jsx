import { useState, useEffect } from 'react';
import { Plus, Dumbbell } from 'lucide-react';
import ExerciseCard from '../../components/ExerciseCard';
import { createExercise, deleteExercise, getAllExercises, updateExercise } from './api/exerciseApi';
import { toast, ToastContainer } from 'react-toastify';
import ExerciseFormModal from '../../components/ExerciseFormModal';
import ExercisesList from '../../components/ExercisesList';


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

      {/* Exercises List Sidebar */}
      <ExercisesList
        filteredExercises={filteredExercises}
        selectedExercise={selectedExercise}
        searchTerm={searchTerm}
        loading={loading}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onExerciseSelect={setSelectedExercise}
        onAddExercise={() => setShowAddModal(true)}
      />

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
        <EmptyDetailView onAddExercise={() => setShowAddModal(true)} />
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

const EmptyDetailView = ({ onAddExercise }) => (
  <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
    <div className="text-center max-w-md">
      <Dumbbell className="mx-auto h-16 w-16 text-gray-300 mb-4" />
      <h2 className="text-xl font-medium text-gray-500">Select an exercise to view details</h2>
      <p className="text-gray-400 mt-2">
        Or create a new exercise by clicking the "Add Exercise" button
      </p>
      <button
        onClick={onAddExercise}
        className="mt-4 px-4 py-2 bg-[#ecf87e] text-gray-800 rounded-lg hover:bg-[#d4e86b] transition-colors"
      >
        <Plus size={16} className="inline mr-1" />
        Add Exercise
      </button>
    </div>
  </div>
);

export default Exercises;