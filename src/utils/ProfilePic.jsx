  import {User as UserIcon} from 'lucide-react'
  export const renderProfilePic = (user) => {
    if (user.profilePic) {
      return (
        <img
          src={user.profilePic}
          alt={`${user.name}'s profile`}
          className="w-10 h-10 rounded-full object-cover"
        />
      );
    }
    const initials = user.name.charAt(0).toUpperCase();

    return (
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold select-none">
        {initials || <UserIcon />}
      </div>
    );
  };