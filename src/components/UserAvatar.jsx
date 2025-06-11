const UserAvatar = ({ user }) => {
  console.log("user from user avatar ", user)
  return user?.profilePic ? (
    <img
      src={user.profilePic}
      alt={user.name}
      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
    />
  ) : (
    <div className="w-10 h-10 rounded-full  gradient-btn flex items-center justify-center text-white font-semibold text-xl shadow-sm">
      {user?.name.charAt(0).toUpperCase()}
    </div>
  );
};

export default UserAvatar;
