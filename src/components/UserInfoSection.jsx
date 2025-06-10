import React from 'react';

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

  return (
    <div className="w-full flex-1 space-y-4">
      {/* Name and Role */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold pb-4 text-mainBlue">{name || 'Admin'}</h1>
        <span className="mt-2 sm:mt-0 px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full">
          {role || 'Admin'}
        </span>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <span>📧</span>
          <span>{email || 'Not provided'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🚻</span>
          <span>{gender || 'Not specified'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🎂</span>
          <span>{age != null ? `${age} years` : 'N/A'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🏅</span>
          <span>{points != null ? `${points} pts` : '0 pts'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🔥</span>
          <span>{activityLevel || 'No activity level set'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🎯</span>
          <span>{fitnessGoal || 'No goal set'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>⚖️</span>
          <span>{weight != null ? `${weight} kg` : 'N/A'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>📏</span>
          <span>{height != null ? `${height} cm` : 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfoSection;
