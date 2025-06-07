import { useEffect, useState } from 'react';
import { getAllWorkouts, createWorkout, updateWorkout, deleteWorkout } from './api/workoutApi.js';
import WorkoutCard from '../../components/WorkoutCard.jsx';
import { AddModal } from '../../components/AddModal.jsx';
import GradientButton from '../../components/GradientButton.jsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);


  // Fetch workouts on component mount
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const data = await getAllWorkouts();
        setWorkouts(data.data);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch workouts:', err);
        toast.error(`Failed to load workouts: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  // Handle creating a new workout
  const handleAdd = async (formData) => {
    try {
      const newWorkout = await createWorkout(formData);
      setWorkouts([...workouts, newWorkout.data]);
      setShowAddModal(false);
      toast.success('Workout created successfully!');
    } catch (err) {
      console.error('Failed to create workout:', err);
      setError(err.message);
      toast.error(`Failed to create workout: ${err.message}`);
    }
  };

  // Handle updating a workout
  const handleUpdate = async (id, formData) => {
    try {
      const updatedWorkout = await updateWorkout(id, formData);
      setWorkouts(workouts.map(workout => 
        workout._id === id ? updatedWorkout.data : workout
      ));
      toast.success('Workout updated successfully!');
    } catch (err) {
      console.error('Failed to update workout:', err);
      setError(err.message);
      toast.error(`Failed to update workout: ${err.message}`);
    }
  };

  // Handle deleting a workout
  const handleDelete = async (id) => {
    try {
      await deleteWorkout(id);
      setWorkouts(workouts.filter(workout => workout._id !== id));
      toast.success('Workout deleted successfully!');
    } catch (err) {
      console.error('Failed to delete workout:', err);
      setError(err.message);
      toast.error(`Failed to delete workout: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#14919B]"></div>
        <span className="ml-3 text-gray-600">Loading workouts...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Failed to load workouts: {error}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-10">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Workout Programs</h1>
        <GradientButton
          onClick={() => setShowAddModal(true)}
          className='mr-20 py-[10px] w-[160px]'
        >
          <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          New Workout
        </GradientButton>
      </div>

      {workouts?.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No workouts found</h3>
          <p className="mt-1 text-gray-500">Get started by creating a new workout program.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <WorkoutCard 
              key={workout._id} 
              workout={workout} 
              onEdit={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showAddModal && (
        <AddModal
          onAdd={handleAdd}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
};

export default Workouts;