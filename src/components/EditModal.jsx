import GradientButton from './GradientButton.jsx';
import { X } from 'lucide-react';

export const EditModal = ({ 
  data, 
  setData, 
  onSave, 
  onClose,
  columns
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">Edit Data</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          {columns.map((column) => (
            <div key={column.key} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {column.label}
              </label>
              {column.type === 'textarea' ? (
                <textarea
                  value={data[column.key] || ''}
                  onChange={(e) => setData({...data, [column.key]: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#14919B] focus:border-transparent transition-all"
                  rows="3"
                />
              ) : (
                <input
                  type={column.type || 'text'}
                  value={data[column.key] || ''}
                  onChange={(e) => setData({...data, [column.key]: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#14919B] focus:border-transparent transition-all"
                />
              )}
            </div>
          ))}
          <GradientButton onClick={onSave} className="w-full mt-4">
            Save Changes
          </GradientButton>
        </div>
      </div>
    </div>
  );
};