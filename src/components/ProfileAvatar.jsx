import { useState } from 'react';
import { User } from 'lucide-react';

const ProfileAvatar = ({ src, name }) => {
  const [imgError, setImgError] = useState(false);

  if (!src || imgError) {
    return (
      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
        <User className="h-5 w-5 text-gray-500" />
        <span className="sr-only">{name}'s default avatar</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${name}'s profile`}
      className="h-10 w-10 rounded-full object-cover"
      onError={() => setImgError(true)}
      loading="lazy"
    />
  );
};

export default ProfileAvatar;
