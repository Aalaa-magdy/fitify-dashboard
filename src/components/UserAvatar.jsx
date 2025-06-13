const UserAvatar = ({ user, size = "md", className = "" }) => {
  const sizeClasses = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg"
  };

  return user?.profilePic ? (
    <img
      src={user.profilePic}
      alt={user.name}
      className={`rounded-full object-cover border-2 border-white shadow-sm ${sizeClasses[size]} ${className}`}
    />
  ) : (
    <div 
      className={`rounded-full bg-[#14919B] flex items-center justify-center text-white font-semibold shadow-sm ${sizeClasses[size]} ${className}`}
      style={{ backgroundColor: '#14919B', color: '#ECF87E' }}
    >
      {user?.name?.charAt(0).toUpperCase()}
    </div>
  );
};

export default UserAvatar;