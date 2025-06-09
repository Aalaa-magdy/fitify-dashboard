import { Eye, Shield, Trash2 } from 'lucide-react';

const UserCardActions = () => (
  <div className="mt-6 flex justify-between items-center border-t border-gray-100 pt-4">
    <button className="flex items-center text-sm font-medium text-mainBlue hover:text-mainGreen transition-colors group">
      <Eye size={16} className="mr-1.5" />
      View Details
    </button>
    <div className="flex gap-2">
      <button
        className="p-2 text-gray-500 hover:text-mainBlue hover:bg-blue-50 rounded-full transition-colors"
        title="change role"
      >
        <Shield size={18} />
      </button>

      <button
        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
        title="Delete user"
      >
        <Trash2 size={18} />
      </button>
    </div>
  </div>
);

export default UserCardActions;
