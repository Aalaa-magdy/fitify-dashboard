import { User } from "lucide-react";

export const ProfileCard = ({
  avatarUrl,
  name,
  role,
  email,
  gender,
  age,
  points,
  activityLevel,
  fitnessGoal,
  weight,
  height,
  onAvatarChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full flex flex-col md:flex-row items-center md:items-start gap-8">
      {/* Avatar section */}
      <div className="flex flex-col items-center">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Profile"
            className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-blue-200"
          />
        ) : (
          <div className="w-28 h-28 md:w-32 md:h-32 flex items-center justify-center bg-blue-50 rounded-full border-4 border-blue-200">
            <User className="w-12 h-12 text-mainBlue" />
          </div>
        )}

        <button
          onClick={onAvatarChange}
          className="mt-4 px-4 py-2 text-sm font-medium text-mainBlue bg-blue-100 rounded-lg hover:bg-blue-200 transition"
        >
          Change Photo
        </button>
      </div>

      {/* Info Section */}
      <div className="w-full flex-1 space-y-6">
        {/* Name and Role */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-gray-800">{name || "Admin"}</h1>
          <span className="mt-2 sm:mt-0 px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full">
            {role || "Admin"}
          </span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <span>📧</span>
            <span>{email || "Not provided"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🚻</span>
            <span>{gender || "Not specified"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🎂</span>
            <span>{age != null ? `${age} years` : "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🏅</span>
            <span>{points != null ? `${points} pts` : "0 pts"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🔥</span>
            <span>{activityLevel || "No activity level set"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🎯</span>
            <span>{fitnessGoal || "No goal set"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⚖️</span>
            <span>{weight != null ? `${weight} kg` : "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📏</span>
            <span>{height != null ? `${height} cm` : "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
