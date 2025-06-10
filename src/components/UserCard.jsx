import UserAvatar from './UserAvatar';
import UserCardActions from './UserCardActions';

const UserCard = ({ user }) => (
  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    <div className="p-5">
      <div className="flex flex-col items-start gap-4">
       
          <div className="flex items-center gap-2">
             <UserAvatar user={user} />
            <h3 className="font-semibold text-gray-800 text-lg">{user.name}</h3>
          </div>
          <div className="mt-3 flex flex-col gap-2">
             <p className="text-gray-500 text-sm mt-1">{user.email}</p>
            <span className="px-2 py-1 bg-blue-50 text-mainBlue w-14 text-xs font-medium rounded-full">
              {user.role || 'Member'}
            </span>
          </div>
      </div>
      <UserCardActions />
    </div>
  </div>
);

export default UserCard;
