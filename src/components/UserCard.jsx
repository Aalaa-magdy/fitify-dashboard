import { motion } from 'framer-motion';
import UserInfoSection from './UserInfoSection';
import axios from '../api/axiosInstance';
import { toast } from 'react-toastify';
import { useState } from 'react';
import UserMenuModal from './UserMenuModal';
import UserChartProgress from './UserProgressChart';
import UserPostsModal from './UserPostsModal';
import { 
  MessageSquare, 
  Users, 
  UserPlus,
  AlertCircle
} from 'lucide-react';

const UserCard = ({ user }) => {
  const [showUserModal, setShowUserModal] = useState(false);
  const [modalData, setModalData] = useState({ users: [], title: '' });
  const [postsData, setPostsData] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);

  const handleStatClick = async (statName) => {
    if (statName.toLowerCase() === 'posts') {
      try {
        const res = await axios.get(`/community/user-posts/${user._id}`);
        const posts = res.data.data;
        setPostsData(posts);
        setShowPostModal(true);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load posts');
      }
    } else {
      try {
        const res = await axios.get(`/users/${statName.toLowerCase()}/${user._id}`);
        setModalData({ 
          users: res.data.data, 
          title: statName 
        });
        setShowUserModal(true);
      } catch (error) {
        console.error(error);
        toast.error(`Failed to load ${statName}`);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };


  const statCardVariants = {
    hover: {
      y: -5,
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
      transition: { duration: 0.2 }
    }
  };

  const renderStatCard = (title, value, icon, index) => {
    const hasError = value === undefined || value === null;
    const valueColor = hasError ? 'text-gray-400' : 'text-gray-800';
    
    return (
      <motion.div 
        key={title}
        className={`rounded-xl bg-white h-full p-3 flex flex-col justify-between border border-gray-200 ${
          hasError ? 'opacity-80' : 'cursor-pointer hover:border-mainBlue'
        }`}
        variants={statCardVariants}
        whileHover={hasError ? {} : "hover"}
        initial="hidden"
        animate="visible"
        custom={index}
        transition={{ delay: index * 0.1 }}
        onClick={() => !hasError && handleStatClick(title)}
      >
        <div className="flex items-center justify-between">
          <div className="text-gray-600 text-sm font-medium">{title}</div>
          <div className={`p-1 rounded-lg ${
            hasError ? 'bg-gray-100 text-gray-400' : 'bg-mainBlue/10 text-mainBlue'
          }`}>
            {hasError ? <AlertCircle className="w-4 h-4" /> : icon}
          </div>
        </div>
        <div className={`text-2xl font-bold mt-2 ${valueColor}`}>
          {hasError ? 'N/A' : value}
        </div>
        <div className={`text-xs mt-1 ${
          hasError ? 'text-gray-400' : 'text-mainBlue'
        }`}>
          {hasError ? 'Data unavailable' : 'Click to view details'}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-6 border border-gray-200">
        <UserInfoSection user={user} />
      </div>
    
      {/* Stats section */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        {renderStatCard(
          'Posts', 
          user?.posts?.length, 
          <MessageSquare className="w-4 h-4" />,
          0
        )}
        {renderStatCard(
          'Followers', 
          user?.followers?.length || 0, 
          <Users className="w-4 h-4" />,
          1
        )}
        {renderStatCard(
          'Following', 
          user?.following?.length || 0, 
          <UserPlus className="w-4 h-4" />,
          2
        )}
      </motion.div>
       
      <UserChartProgress user={user} />

      {/* Modals */}
      {showUserModal && (
        <UserMenuModal
          isOpen={showUserModal}
          onClose={() => setShowUserModal(false)}
          users={modalData.users}
          title={modalData.title}
        />
      )}

      {showPostModal && (
        <UserPostsModal 
          isOpen={showPostModal}
          onClose={() => setShowPostModal(false)}
          posts={postsData}
          title="My Posts"
        />
      )}
    </div>
  );
};

export default UserCard;