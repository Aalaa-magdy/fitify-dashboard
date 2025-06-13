import { Plus, Search, Dumbbell, HelpCircle } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import ChallengeListItem from './ChallengeListItem';

const ChallengesList = ({
  challenges,
  selectedChallenge,
  searchTerm,
  loading,
  onSearchChange,
  onChallengeSelect,
  onAddChallenge,
  onEditChallenge,
  onDeleteChallenge
}) => {
  const filteredChallenges = challenges.filter(challenge => {
    const contentMatch = challenge.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const exerciseMatch = challenge.type === 'exercise' && 
                         challenge.exerciseId?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return contentMatch || exerciseMatch;
  });

  return (
    <div className={`w-full p-2 md:w-[45%] border-r border-gray-200 ${selectedChallenge ? 'hidden md:block' : ''}`}>
      {/* Header Section */}
      <div className=" border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl text-black font-bold">Challenges</h1>
          <button
            onClick={onAddChallenge}
            className="flex items-center px-3 py-2 bg-[#14919B]  text-white rounded-lg hover:bg-[#d4e86b] transition-colors"
          >
            <Plus size={18} className="mr-1" />
            Add Challenge
          </button>
        </div>
        
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search challenges..."
            value={searchTerm}
            onChange={onSearchChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#14919B] focus:border-transparent"
          />
        </div>
      </div>

      {/* Challenges List */}
      {loading ? (
        <LoadingSpinner/>
      ) : filteredChallenges.length > 0 ? (
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}>
          {filteredChallenges.map((challenge) => (
            <ChallengeListItem
              key={challenge._id}
              challenge={challenge}
              isSelected={selectedChallenge?._id === challenge._id}
              onClick={() => onChallengeSelect(challenge)}
              onEdit={onEditChallenge}
              onDelete={onDeleteChallenge}
            />
          ))}
        </div>
      ) : (
        <EmptyState 
          searchTerm={searchTerm} 
          onAddChallenge={onAddChallenge}
        />
      )}
    </div>
  );
};

const EmptyState = ({ searchTerm, onAddChallenge }) => (
  <div className="p-8 text-center">
    <div className="mx-auto h-12 w-12 text-gray-400 mb-4 flex items-center justify-center">
      <Dumbbell className="h-6 w-6" />
      <HelpCircle className="h-6 w-6 -ml-2" />
    </div>
    <h3 className="text-lg font-medium text-gray-900">
      {searchTerm ? 'No matching challenges found' : 'No challenges yet'}
    </h3>
    <p className="text-gray-500 mt-1">
      {searchTerm ? 'Try a different search term' : 'Create your first challenge'}
    </p>
    {!searchTerm && (
      <button
        onClick={onAddChallenge}
        className="mt-4 px-4 font-bold py-2 bg-[#14919B] text-white rounded-lg hover:bg-[#54abb1] transition-colors"
      >
        <Plus size={16} className="inline mr-1" />
        Add Challenge
      </button>
    )}
  </div>
);

export default ChallengesList;