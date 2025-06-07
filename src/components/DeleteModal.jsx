import GradientButton from './GradientButton.jsx'; // Assuming you have this component
import { Trash2 } from 'lucide-react';
export const DeleteModal = ({ 
  onDelete, 
  onClose 
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-fade-in">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <Trash2 className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="mt-3 text-lg font-medium text-gray-900">Delete Workout</h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this workout? This action cannot be undone.
            </p>
          </div>
        </div>
        <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm border border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <GradientButton 
            onClick={onDelete}
            className="bg-gradient-to-r from-red-500 to-red-600"
          >
            Delete
          </GradientButton>
        </div>
      </div>
    </div>
  );
};