import { User } from 'lucide-react';

const UserAvatar = ({ user, size = "md", className = "" }) => {
  const sizeClasses = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  };

  const iconSize = {
    xs: 14,
    sm: 18,
    md: 22,
    lg: 26
  };

  return user?.profilePic ? (
    <img
      src={user.profilePic}
      alt={user.name}
      className={`rounded-full object-cover border-2 border-white shadow-sm ${sizeClasses[size]} ${className}`}
    />
  ) : (
    <div 
      className={`rounded-full flex items-center justify-center bg-gray-200 shadow-sm ${sizeClasses[size]} ${className}`}
     
    >
      <User 
        size={iconSize[size]} 
        className="text-mainBlue" 
        strokeWidth={2.5}
      />
    </div>
  );
};

export default UserAvatar;