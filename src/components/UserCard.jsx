import { motion } from 'framer-motion';
import UserInfoSection from './UserInfoSection';
import axios from '../api/axiosInstance'
import { toast } from 'react-toastify';
import { useState } from 'react';
import { StatsCard } from './StatsCard';
import UserMenuModal from './UserMenuModal';

const UserCard = ({ user }) => {

    const [showUserModal, setShowUserModal] = useState(false);
    const [modalData, setModalData] = useState({ users: [], title: '' });
    const [postsData, setPostsData] = useState(null);
    const [showPostModal, setShowPostModal]= useState(false);

  const handleStatClick = async (statName) => {
    if (statName.toLowerCase() === 'posts') {
    try {
      const res = await axios.get(`/community/user-posts`);
      const posts = res.data.data;
      setPostsData(posts);
      setShowPostModal(true);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to load posts`);
    }
  }
  else {
 setShowUserModal(true);
  try {
    const res = await axios.get(`/users/${statName.toLowerCase()}`);
    const users = res.data.data;
    setModalData({users: users, title: statName})
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };


  return (
    <div className='bg-gray-50' >
      <div className='bg-white border border-gray-200 p-2 rounded-xl overflow-hidden shadow-sm'>
        <UserInfoSection user={user} />
      </div>
    
      {/* Stats section */}
       <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8"
      >
        <motion.div variants={itemVariants}>
          <StatsCard value={user?.posts?.length} label="Posts" onClick={() => handleStatClick('Posts')} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard value={user?.followers?.length || 0} label="Followers" onClick={() => handleStatClick('Followers')} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard value={user?.following?.length|| 0} label="Following" onClick={() => handleStatClick('Following')} />
        </motion.div>
      </motion.div>

      {showUserModal && (
        <UserMenuModal
          isOpen={showUserModal}
          onClose={() => setShowUserModal(false)}
          users={modalData.users}
          title={modalData.title}
        />
      )}

      {
        showPostModal && (
         <UserPostsModal 
           isOpen={showPostModal}
          onClose={() => setShowPostModal(false)}
          posts={postsData}
          title="My Posts"
          />
        )
      }
    </div>
  );
};

export default UserCard;