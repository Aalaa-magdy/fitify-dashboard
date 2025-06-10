import { useState } from 'react';
import ChallengeTypeSelector from './ChallengeTypeSelector';
import ExerciseChallengeForm from './ExerciseChallengeForm';
import TriviaChallengeForm from './TriviaChallengeForm';

const ChallengeCreator = () => {
  const [selectedType, setSelectedType] = useState(null);

  const handleSubmit = (challengeData) => {
    console.log('Submitting challenge:', challengeData);
    // Here you would typically send the data to your API
    // Reset the form after submission
    setSelectedType(null);
    alert('Challenge created successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-[#14919B] mb-6">Create New Challenge</h2>
      
      {!selectedType ? (
        <ChallengeTypeSelector onSelectType={setSelectedType} />
      ) : selectedType === 'exercise' ? (
        <ExerciseChallengeForm 
          onSubmit={handleSubmit} 
          onCancel={() => setSelectedType(null)} 
        />
      ) : (
        <TriviaChallengeForm 
          onSubmit={handleSubmit} 
          onCancel={() => setSelectedType(null)} 
        />
      )}
    </div>
  );
};

export default ChallengeCreator;