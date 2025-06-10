import { useState, useEffect } from 'react';
import { getAllExercises } from '../features/exercises/api/exerciseApi';

const ExerciseChallengeForm = ({ onSubmit, onCancel, initialData }) => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    exerciseId: '',
    points: 20,
    content: '',
    calcMethod: 'reps',
    target: 10
  });

  useEffect(() => {
    // Initialize form with initialData if it exists (edit mode)
    if (initialData) {
      setFormData({
        exerciseId: initialData.exerciseId?._id || initialData.exerciseId || '',
        points: initialData.points || 20,
        content: initialData.content || '',
        calcMethod: initialData.calcMethod || 'reps',
        target: initialData.target || 10
      });
    }

    const fetchExercises = async () => {
      try {
        const response = await getAllExercises();
        setExercises(response.data || []);
      } catch (error) {
        console.error("Failed to fetch exercises:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      type: 'exercise',
      ...formData
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {initialData ? 'Edit Exercise Challenge' : 'Create Exercise Challenge'}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {
            initialData ? ' ':(
              <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Exercise*</label>
            <select
              value={formData.exerciseId}
              onChange={(e) => setFormData({...formData, exerciseId: e.target.value})}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
              disabled={loading}
            >
              <option value="">{loading ? 'Loading exercises...' : 'Select an exercise'}</option>
              {exercises.map(exercise => (
                <option key={exercise._id} value={exercise._id}>{exercise.name}</option>
              ))}
            </select>
          </div>
            )
          }

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Points*</label>
            <input
              type="number"
              value={formData.points}
              onChange={(e) => setFormData({...formData, points: e.target.value})}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
              rows="2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Calculation Method*</label>
              <select
                value={formData.calcMethod}
                onChange={(e) => setFormData({...formData, calcMethod: e.target.value})}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
              >
                <option value="reps">Repetitions</option>
                <option value="time">Time (seconds)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Value*</label>
              <input
                type="number"
                value={formData.target}
                onChange={(e) => setFormData({...formData, target: e.target.value})}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#14919B] text-white rounded-lg hover:bg-[#0e6b73] transition-colors"
            >
              {initialData ? 'Update Challenge' : 'Create Challenge'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ExerciseChallengeForm;