import { Dumbbell, HelpCircle } from 'lucide-react';

const ChallengeTypeSelector = ({ onSelectType }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Challenge Type</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => onSelectType('exercise')}
          className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Dumbbell className="h-5 w-5 text-[#14919B] mr-2" />
          <span>Exercise Challenge</span>
        </button>
        <button
          onClick={() => onSelectType('trivia')}
          className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <HelpCircle className="h-5 w-5 text-[#14919B] mr-2" />
          <span>Trivia Challenge</span>
        </button>
      </div>
    </div>
  );
};

export default ChallengeTypeSelector