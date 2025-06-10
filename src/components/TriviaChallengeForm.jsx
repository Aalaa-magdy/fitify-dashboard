import { useState, useEffect } from 'react';

const TriviaChallengeForm = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    question: '',
    correctAnswer: '',
    options: ['', '', '', ''],
    points: 10,
    timeLimit: 30
  });

  useEffect(() => {
    // Initialize form with initialData if it exists (edit mode)
    if (initialData) {
      setFormData({
        question: initialData.content || initialData.questionId?.question || '',
        correctAnswer: initialData.questionId?.correctAnswer || '',
        options: initialData.questionId?.options || ['', '', '', ''],
        points: initialData.points || 10,
        timeLimit: initialData.timeLimit || 30
      });
    }
  }, [initialData]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({...formData, options: newOptions});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate that correct answer is one of the options
    if (!formData.options.includes(formData.correctAnswer)) {
      alert("Correct answer must be one of the options!");
      return;
    }

    onSubmit({
      type: 'trivia',
      content: formData.question,
      questionId: {
        question: formData.question,
        options: formData.options.filter(opt => opt !== ''), // Remove empty options
        correctAnswer: formData.correctAnswer
      },
      points: formData.points,
      timeLimit: formData.timeLimit
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {initialData ? 'Edit Trivia Challenge' : 'Create Trivia Challenge'}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Question*</label>
            <input
              type="text"
              value={formData.question}
              onChange={(e) => setFormData({...formData, question: e.target.value})}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correct Answer*</label>
            <input
              type="text"
              value={formData.correctAnswer}
              onChange={(e) => setFormData({...formData, correctAnswer: e.target.value})}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Options* (4 required)</label>
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  value={formData.options[index] || ''}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
                  placeholder={`Option ${index + 1}`}
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Limit (seconds)*</label>
              <input
                type="number"
                value={formData.timeLimit}
                onChange={(e) => setFormData({...formData, timeLimit: e.target.value})}
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

export default TriviaChallengeForm;