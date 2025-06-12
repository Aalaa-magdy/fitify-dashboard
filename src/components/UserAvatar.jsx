

const UserAvatar = ({ user }) => {
  console.log("user from user avatar ", user)
  return user?.profilePic ? (
    <img
      src={user.profilePic}
      alt={user.name}
      className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
    />
  ) : (
    <div className="w-8 h-8 rounded-full  bg-gray-200 flex items-center justify-center text-mainBlue font-semibold text-xl shadow-sm">
      {user?.name?.charAt(0).toUpperCase()}
    </div>
   
  );
};

export default UserAvatar;
