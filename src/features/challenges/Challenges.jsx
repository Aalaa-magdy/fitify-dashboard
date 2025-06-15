import { useState, useEffect } from 'react';
import { Plus, Dumbbell ,HelpCircle} from 'lucide-react';

import { toast, ToastContainer } from 'react-toastify';
import { getAllChallenges, createChallenge, updateChallenge, deleteChallenge ,createTriviaQuestion,updateTriviaQuestion} from './api/challengeApi';
import ChallengeTypeSelector from '../../components/ChallengeTypeSelector';
import ExerciseChallengeForm from '../../components/ExerciseChallengeForm';
import TriviaChallengeForm from '../../components/TriviaChallengeForm';
import ChallengesList from '../../components/ChallengeList';
import ChallengeDetail from '../../components/ChallengeDetail';


const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState(null);
  const [editingChallenge, setEditingChallenge] = useState(null);
  useEffect(() => {
  console.log("Selected challenge changed:", selectedChallenge);
}, [selectedChallenge]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const data = await getAllChallenges();
        setChallenges(data.data || []);
      } catch (err) {
        console.error('Failed to fetch challenges:', err);
        toast.error(`Failed to load challenges: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const handleAddChallenge = () => {
    setEditingChallenge(null);
    setFormType(null);
    setShowForm(true);
  };

  const handleEditChallenge = (challenge) => {
    setEditingChallenge(challenge);
    setFormType(challenge.type);
    setShowForm(true);
  };

const handleSubmitChallenge = async (challengeData) => {
  try {
    let updatedChallenge;
    
    if (editingChallenge) {
      // Editing existing challenge
      if (challengeData.type === 'exercise') {
        const response = await updateChallenge(editingChallenge._id, challengeData);
        updatedChallenge = response.data;
      } else if (challengeData.type === 'trivia') {
        // Just update the trivia question - challenge will be updated automatically
        const response = await updateTriviaQuestion(
          editingChallenge.questionId._id, 
          {
            question: challengeData.content,
            options: challengeData.questionId.options,
            correctAnswer: challengeData.questionId.correctAnswer
          }
        );
         console.log(response,"dif")   
         // Create the updated challenge object manually
        updatedChallenge = {
          ...editingChallenge,
          content: challengeData.content,
          questionId: {
            ...editingChallenge.questionId,
            question: challengeData.content,
            options: challengeData.questionId.options,
            correctAnswer: challengeData.questionId.correctAnswer
          }
        };
      }
      
      // Update state with the new challenge data
      setChallenges(challenges.map(c => 
        c._id === editingChallenge._id ? updatedChallenge : c
      ));
      
      // Also update selectedChallenge if it's the one being edited
      if (selectedChallenge?._id === editingChallenge._id) {
        setSelectedChallenge(updatedChallenge);
      }
      
      toast.success('Challenge updated successfully!');
    } else {
      // Creating new challenge (unchanged from your original code)
      let response;
      if (challengeData.type === 'exercise') {
        response = await createChallenge(challengeData);
        setChallenges([...challenges, response.data]);
      } else if (challengeData.type === 'trivia') {
        const triviaResponse = await createTriviaQuestion({
          question: challengeData.content,
          options: challengeData.questionId.options,
          correctAnswer: challengeData.questionId.correctAnswer
        });
        
        response = await createChallenge({
          ...challengeData,
          questionId: triviaResponse.data._id
        });
        setChallenges([...challenges, response.data]);
        // setSelectedChallenge(response.data);
      }
      toast.success('Challenge created successfully!');
    }
    
    setShowForm(false);
    setEditingChallenge(null);
    
  } catch (err) {
    console.error('Failed to save challenge:', err);
    toast.error(`Failed to save challenge: ${err.message}`);
  }
};


  const handleDeleteChallenge = async (id) => {
    try {
      await deleteChallenge(id);
      setChallenges(challenges.filter(c => c._id !== id));
      if (selectedChallenge?._id === id) {
        setSelectedChallenge(null);
      }
      toast.success('Challenge deleted successfully!');
    } catch (err) {
      console.error('Failed to delete challenge:', err);
      toast.error(`Failed to delete challenge: ${err.message}`);
    }
  };

  return (
    <div className="flex h-screen ">
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

      {/* Challenges List Sidebar */}
      <ChallengesList
        challenges={challenges}
        selectedChallenge={selectedChallenge}
        searchTerm={searchTerm}
        loading={loading}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onChallengeSelect={setSelectedChallenge}
        onAddChallenge={handleAddChallenge}
      />

      {/* Challenge Detail View or Empty State */}
      {selectedChallenge ? (
        <div className="flex-1 overflow-y-auto">
          <ChallengeDetail 
            challenge={selectedChallenge} 
            onEdit={() => handleEditChallenge(selectedChallenge)}
            onDelete={() => handleDeleteChallenge(selectedChallenge._id)}
          />
        </div>
      ) : (
        <EmptyDetailView onAddChallenge={handleAddChallenge} />
      )}

      {/* Challenge Creation/Edit Flow */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {!formType ? (
              <ChallengeTypeSelector onSelectType={setFormType} />
            ) : formType === 'exercise' ? (
              <ExerciseChallengeForm
                onSubmit={handleSubmitChallenge}
                onCancel={() => setShowForm(false)}
                initialData={editingChallenge}
              />
            ) : (
              <TriviaChallengeForm
                onSubmit={handleSubmitChallenge}
                onCancel={() => setShowForm(false)}
                initialData={editingChallenge}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const EmptyDetailView = ({ onAddChallenge }) => (
  <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
    <div className="text-center max-w-md">
      <div className="mx-auto h-16 w-16 text-gray-300 mb-4 flex items-center justify-center">
        <Dumbbell className="h-8 w-8" />
        <HelpCircle className="h-8 w-8 -ml-3" />
      </div>
      <h2 className="text-xl font-medium text-gray-500">Select a challenge to view details</h2>
      <p className="text-gray-400 mt-2">
        Or create a new challenge by clicking the "Add Challenge" button
      </p>
      <button
        onClick={onAddChallenge}
        className="mt-4 px-4 py-2 bg-[#14919B] text-white rounded-lg hover:bg-[#317277] transition-colors"
      >
        <Plus size={16} className="inline mr-1" />
        Add Challenge
      </button>
    </div>
  </div>
);

export default Challenges;