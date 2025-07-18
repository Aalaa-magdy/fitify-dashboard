import { useEffect, useState } from 'react';
import { X, Dumbbell, Activity, BarChart2 } from 'lucide-react';
import axios from '../api/axiosInstance';

const ExercisesMenu = ({ workout, onClose }) => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(`/workout/workout-exercises/${workout._id}`);
        setExercises(response.data.data.exercises || []);
      } catch (error) {
        console.error("Failed to fetch exercises:", error);
        setExercises([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [workout._id]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{workout.name} Exercises</h2>
            <p className="text-xs text-gray-500">{exercises.length} exercises</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#14919B]"></div>
            </div>
          ) : exercises.length > 0 ? (
            <div className="space-y-3">
              {exercises.map((exercise) => (
                <div key={exercise._id} className="flex border border-gray-200 rounded-lg overflow-hidden">
                  {/* Exercise Image - Left Side */}
                  <div className="w-1/4 min-w-[100px] bg-gray-100 flex-shrink-0">
                    {exercise.imageUrl?.[0] ? (
                      <img 
                        src={exercise.imageUrl[0]} 
                        alt={exercise.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <Dumbbell className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Exercise Details - Right Side */}
                  <div className="w-3/4 p-3 flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-base font-bold text-gray-800">{exercise.name}</h3>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{exercise.description}</p>

                      {/* Metadata */}
                      <div className="mt-2 grid grid-cols-2 gap-1">
                        <div className="flex items-center space-x-1">
                          <Activity className="h-3 w-3 text-[#14919B]" />
                          <div>
                            <p className="text-[10px] text-gray-500">Difficulty</p>
                            <p className="text-xs capitalize">{exercise.difficulty}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Dumbbell className="h-3 w-3 text-[#14919B]" />
                          <div>
                            <p className="text-[10px] text-gray-500">Equipment</p>
                            <p className="text-xs capitalize">{exercise.equipment}</p>
                          </div>
                        </div>
                      </div>

                      {/* Muscle Groups */}
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center space-x-1">
                          <BarChart2 className="h-3 w-3 text-[#14919B]" />
                          <h4 className="text-[10px] font-medium text-gray-800">Target Muscles</h4>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {exercise.targetMuscles?.map((muscle) => (
                            <span key={muscle} className="px-1 py-0.5 text-[9px] bg-green-100 text-green-800 rounded-full">
                              {muscle}
                            </span>
                          ))}
                        </div>
                      </div>

                      {exercise.secondaryMuscles?.length > 0 && (
                        <div className="mt-1 space-y-1">
                          <div className="flex items-center space-x-1">
                            <BarChart2 className="h-3 w-3 text-[#14919B]" />
                            <h4 className="text-[10px] font-medium text-gray-800">Secondary Muscles</h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {exercise.secondaryMuscles.map((muscle) => (
                              <span key={muscle} className="px-1 py-0.5 text-[9px] bg-blue-100 text-blue-800 rounded-full">
                                {muscle}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Video Link */}
                    {exercise.videoUrl?.[0] && (
                      <div className="mt-1 pt-1 border-t border-gray-100">
                        <a 
                          href={exercise.videoUrl[0]} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-[10px] text-[#14919B] hover:text-teal-700 hover:underline"
                        >
                          <span>View Exercise Video →</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Dumbbell className="mx-auto h-8 w-8 text-gray-400" />
              <h3 className="mt-2 text-base font-medium text-gray-900">No exercises found</h3>
              <p className="mt-1 text-sm text-gray-500">This workout doesn't have any exercises yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExercisesMenu;