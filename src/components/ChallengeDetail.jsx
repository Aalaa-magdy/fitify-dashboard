import { Dumbbell, HelpCircle, Clock, Award, Edit2, Trash2, Activity } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getExerciseById, getTriviaQuestionById } from '../features/challenges/api/challengeApi.js';

const ChallengeDetail = ({ challenge, onEdit, onDelete }) => {
  const [exerciseDetails, setExerciseDetails] = useState(null);
  const [questionDetails, setQuestionDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        if (challenge.type === 'exercise' && challenge.exerciseId) {
          const exercise = await getExerciseById(challenge.exerciseId._id);
          setExerciseDetails(exercise.data);
        } else if (challenge.type === 'trivia' && challenge.questionId) {
          const question = await getTriviaQuestionById(challenge.questionId._id);
          setQuestionDetails(question.data);
        }
      } catch (error) {
        console.error('Error fetching details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [challenge]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <Activity className="h-10 w-10 text-[#14919B] mb-2 animate-spin" />
          <span className="text-gray-600">Loading challenge details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-[#14919B]  p-6 ">
        <div className="flex justify-between items-start">
          <div className="flex flex-row ">
            {challenge.type === 'exercise' ? (
              <Dumbbell className="h-8 w-10 text-[#14919B]   mr-4" />
            ) : (
              <HelpCircle className="h-8 w-10 mt-1 text-[#14919B]  mr-4" />
            )}
            <div>
              <h1 className="text-2xl  font-bold">
                {challenge.content || 
                  (challenge.type === 'exercise' 
                    ? exerciseDetails?.name 
                    : `${questionDetails?.question} ?`) }
              </h1>
              <div className="flex items-center mt-2">
                <span className="px-3 text-black py-1 rounded-full bg-white bg-opacity-20 text-md font-medium">
                  {challenge.type === 'exercise' ? 'Exercise Challenge' : 'Trivia Challenge'}
                </span>
                {challenge.timeLimit && (
                  <span className="ml-3 px-3 py-1 rounded-full bg-white bg-opacity-20 text-sm font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-1" /> {challenge.timeLimit}s
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={onEdit}
              className="p-2 bg-[#ecf87e] text-gray-800 rounded-full hover:bg-white hover:text-[#daec35] transition-all duration-300 border-2 border-[#daec35] shadow-md"
              title="Edit challenge"
            >
              <Edit2 size={20} />
            </button>
            <button 
              onClick={onDelete}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-white hover:text-red-500 transition-all duration-300 border-2 border-red-500 shadow-md"
              title="Delete challenge"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#14919B]/10 p-4 rounded-lg border border-[#14919B]/20 flex items-center">
            <Award className="h-6 w-6 text-[#14919B] mr-3" />
            <div>
              <h3 className="text-sm font-medium text-gray-700">Points</h3>
              <p className="text-xl font-bold text-[#14919B]">{challenge.points} pts</p>
            </div>
          </div>
          
          <div className="bg-[#14919B]/10 p-4 rounded-lg border border-[#14919B]/20 flex items-center">
            <Clock className="h-6 w-6 text-[#14919B] mr-3" />
            <div>
              <h3 className="text-sm font-medium text-gray-700">Status</h3>
              <p className="text-xl font-bold text-[#14919B] capitalize">{challenge.status || 'active'}</p>
            </div>
          </div>
          
          <div className="bg-[#14919B]/10 p-4 rounded-lg border border-[#14919B]/20 flex items-center">
            <span className="h-6 w-6 text-[#14919B] mr-3 flex items-center justify-center">
              {challenge.type === 'exercise' ? (
                <Dumbbell className="h-5 w-5" />
              ) : (
                <HelpCircle className="h-5 w-5" />
              )}
            </span>
            <div>
              <h3 className="text-sm font-medium text-gray-700">Type</h3>
              <p className="text-xl font-bold text-[#14919B] capitalize">{challenge.type}</p>
            </div>
          </div>
        </div>

        {/* Challenge Details */}
      <div className="space-y-16 ">
  {/* Exercise or Question Specific Details */}
  {challenge.type === 'exercise' ? (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column - Exercise Details */}
      <div className="space-y-10 ">
        <h2 className="text-xl font-bold text-gray-800 border-b pb-2 border-[#14919B]/30">
          Exercise Details
        </h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <span className="text-md font-bold text-gray-500 w-40">Target:</span>
            <span className="text-sm text-gray-800 font-medium">
              {challenge.target} {challenge.calcMethod === 'reps' ? 'repetitions' : 'seconds'}
            </span>
          </div>
          {exerciseDetails?.targetMuscles?.length > 0 && (
            <div className="flex items-start">
              <span className="text-md font-bold text-gray-500 w-40">Primary Muscles:</span>
              <span className="text-sm text-gray-800">
                {exerciseDetails.targetMuscles.join(', ')}
              </span>
            </div>
          )}
          {exerciseDetails?.secondaryMuscles?.length > 0 && (
            <div className="flex items-start">
              <span className="text-md font-bold text-gray-500 w-40">Secondary Muscles:</span>
              <span className="text-sm text-gray-800">
                {exerciseDetails.secondaryMuscles.join(', ')}
              </span>
            </div>
          )}
        </div>

        {exerciseDetails?.description && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2 border-[#14919B]/30">
              Description
            </h2>
            <p className="text-gray-600">{exerciseDetails.description}</p>
          </div>
        )}
      </div>

      {/* Right Column - Exercise Visuals */}
      {exerciseDetails?.imageUrl?.length > 0 && (
        <div className="space-y-4 w-[80%] ml-12">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2 border-[#14919B]/30">
            Exercise Visuals
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {exerciseDetails.imageUrl.map((image, index) => (
              <div key={index} className="rounded-lg overflow-hidden border border-gray-200">
                <img 
                  src={image} 
                  alt={`${exerciseDetails.name} demonstration ${index + 1}`} 
                  className="w-full  max-h-64"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  ) : (
    <>
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 border-b pb-2 border-[#14919B]/30">
          Question Details
        </h2>
        <div className="space-y-3">
          <div className="flex">
            <span className="text-sm font-medium text-gray-500 w-40">Question:</span>
            <span className="text-sm text-gray-800 font-medium">
              {questionDetails?.question}
            </span>
          </div>
          <div className="flex">
            <span className="text-sm font-medium text-gray-500 w-40">Correct Answer:</span>
            <span className="text-sm text-gray-800 font-medium">
              {questionDetails?.correctAnswer}
            </span>
          </div>
        </div>
      </div>
      
      {questionDetails?.options?.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2 border-[#14919B]/30">
            Answer Options
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {questionDetails.options.map((option, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg border-2 ${
                  option === questionDetails.correctAnswer 
                    ? 'border-[#14919B] bg-[#14919B]/10' 
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center">
                  <span className={`font-medium ${
                    option === questionDetails.correctAnswer 
                      ? 'text-[#14919B]' 
                      : 'text-gray-700'
                  }`}>
                    {option}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )}

  {/* Additional Information */}
  <div className="space-y-3">
    <h2 className="text-xl font-bold text-gray-800 border-b pb-2 border-[#14919B]/30">
      Additional Information
    </h2>
    <div className="space-y-2">
      <div className="flex justify-between py-2 border-b border-gray-100">
        <span className="text-sm font-medium text-gray-500">Created</span>
        <span className="text-sm text-gray-800">
          {new Date(challenge.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </span>
      </div>
      {challenge.type === 'exercise' && exerciseDetails?.equipment && (
        <div className="flex justify-between py-2 border-b border-gray-100">
          <span className="text-sm font-medium text-gray-500">Equipment</span>
          <span className="text-sm text-gray-800 capitalize">
            {exerciseDetails.equipment}
          </span>
        </div>
      )}
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default ChallengeDetail;