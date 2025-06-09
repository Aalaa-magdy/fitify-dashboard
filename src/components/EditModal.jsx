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
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Edit Workout</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-6">
            {columns.map((column) => (
              <div key={column.key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {column.label}
                </label>
                {column.type === 'textarea' ? (
                  <textarea
                    value={data[column.key] || ''}
                    onChange={(e) => setData({...data, [column.key]: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
                  />
                ) : column.type === 'select' && column.options ? (
                  <select
                    value={data[column.key] || ''}
                    onChange={(e) => setData({...data, [column.key]: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
                  >
                    {column.options.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={column.type || 'text'}
                    value={data[column.key] || ''}
                    onChange={(e) => setData({...data, [column.key]: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14919B]"
                  />
                )}
              </div>
            ))}
            
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onSave}
                className="px-6 py-2 bg-[#14919B] text-white rounded-lg hover:bg-[#0e6b73] transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};