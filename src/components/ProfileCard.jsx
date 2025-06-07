// components/ProfileCard.js


export const ProfileCard = ({ 
  avatarUrl, 
  name, 
  role, 
  email, 
  gender, 
  age, 
  onAvatarChange 
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-white rounded-xl shadow-sm">
      <div className="flex flex-col items-center">
        <img 
          src={avatarUrl} 
          alt="Profile" 
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
        />
        <button
          onClick={onAvatarChange}
          className="mt-3 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          Change Photo
        </button>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
          <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
            {role}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">📧</span>
            <span className="text-gray-700">{email}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">🚻</span>
            <span className="text-gray-700">{gender}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">🎂</span>
            <span className="text-gray-700">{age} years</span>
          </div>
        </div>
      </div>
    </div>
  );
};