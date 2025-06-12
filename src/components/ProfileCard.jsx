import { User } from "lucide-react";
// import UserInfoSection from "./UserInfoSection";

export const ProfileCard = ({
  avatarUrl,
  onAvatarChange,
  user
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

        <UserInfoSection user={user} />
     
    </div>
  );
};



const UserInfoSection = ({ user }) => {
  const {
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
  } = user || {};

  // Helper function to capitalize first letter
  const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

  return (
    <div className="w-full flex-1 space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Name and Role */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight truncate">
            {name || 'Admin'}
          </h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">Administrator Profile</p>
        </div>
        <span className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-sm whitespace-nowrap">
          {capitalize(role) || 'Admin'}
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Personal Info Card */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Personal Information
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-blue-50 flex items-center justify-center">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-xs sm:text-sm font-medium text-gray-500">Email</p>
                <p className="text-xs sm:text-sm text-gray-900 truncate">{email || 'Not provided'}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-purple-50 flex items-center justify-center">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-xs sm:text-sm font-medium text-gray-500">Gender</p>
                <p className="text-xs sm:text-sm text-gray-900">{capitalize(gender) || 'Not specified'}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-amber-50 flex items-center justify-center">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-xs sm:text-sm font-medium text-gray-500">Age</p>
                <p className="text-xs sm:text-sm text-gray-900">{age != null ? `${age} years` : 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fitness Info Card */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Fitness Information
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-green-50 flex items-center justify-center">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-xs sm:text-sm font-medium text-gray-500">Points</p>
                <p className="text-xs sm:text-sm text-gray-900">{points != null ? `${points} pts` : '0 pts'}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-red-50 flex items-center justify-center">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-xs sm:text-sm font-medium text-gray-500">Activity Level</p>
                <p className="text-xs sm:text-sm text-gray-900">{capitalize(activityLevel) || 'No activity level set'}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-indigo-50 flex items-center justify-center">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-xs sm:text-sm font-medium text-gray-500">Fitness Goal</p>
                <p className="text-xs sm:text-sm text-gray-900">{capitalize(fitnessGoal) || 'No goal set'}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-yellow-50 flex items-center justify-center">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-xs sm:text-sm font-medium text-gray-500">Weight</p>
                  <p className="text-xs sm:text-sm text-gray-900">{weight != null ? `${weight} kg` : 'N/A'}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-teal-50 flex items-center justify-center">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-xs sm:text-sm font-medium text-gray-500">Height</p>
                  <p className="text-xs sm:text-sm text-gray-900">{height != null ? `${height} cm` : 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


