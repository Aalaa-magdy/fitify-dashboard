import { User } from "lucide-react";
import UserInfoSection from "./UserInfoSection";

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
