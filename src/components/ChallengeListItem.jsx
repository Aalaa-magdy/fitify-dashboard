import { Dumbbell, HelpCircle } from 'lucide-react';

const ChallengeListItem = ({ challenge, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 border-b border-gray-200 cursor-pointer transition-colors hover:bg-[#f0fdf4] flex justify-between items-center ${
        isSelected ? 'bg-[#f0fdf4] border-l-4 border-l-[#14919B]' : ''
      }`}
    >
      <div className="flex items-center">
        {challenge.type === 'exercise' ? (
          <Dumbbell className="h-5 w-5 text-[#14919B] mr-3" />
        ) : (
          <HelpCircle className="h-5 w-5 text-[#14919B] mr-3" />
        )}
        <div>
          <h3 className="font-medium text-gray-900">{challenge.content}</h3>
          <div className="flex items-center mt-1">
            <span className="text-xs px-2 py-1 bg-[#ecf87e]/30 rounded-full text-black mr-2">
              {challenge.type}
            </span>
            <span className="text-xs px-2 py-1 bg-[#e0f2fe] rounded-full text-gray-800">
              {challenge.points} pts
            </span>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default ChallengeListItem;