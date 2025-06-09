import { User } from 'lucide-react';
import UserAvatar from './UserAvatar';

const UserMenuModal = ({ isOpen, onClose, users, title }) => {
  if (!isOpen) return null;
  console.log("users ", users);
  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-3 text-gray-600 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-lg font-semibold mb-4 text-center text-mainBlue">{title}</h2>

        <div className="max-h-72 overflow-y-auto space-y-3">
          {users?.length === 0 ? (
            <p className="text-gray-500 text-center">No {title.toLowerCase()} found.</p>
          ) : (
            users?.map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
             <UserAvatar user={user} />

                <div className="flex flex-col">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-sm text-gray-500">{user.email}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserMenuModal;
