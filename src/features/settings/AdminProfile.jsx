import React, { useEffect, useRef, useState } from 'react';
import { ProfileCard } from '../../components/ProfileCard';
import { StatsCard } from '../../components/StatsCard';
import GradientButton from '../../components/GradientButton';
import { FiPlus, FiLock, FiEdit } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { getMyProfile } from './api/settingsApi';
import { toast } from 'react-toastify';
import * as helpers from './utils/helpers';
import axios from '../../api/axiosInstance'
import UserMenuModal from '../../components/UserMenuModal';
import UserPostsModal from '../../components/UserPostsModal';
import { AddAdminModal } from '../../components/AddAdminModal';
import ChangePasswordModal from '../../components/ChangePasswordModal';
import UpdateInfoModal from '../../components/UpdateInfoModal';



export const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditPass, setShowEditPass] = useState(false);
  const [showEditInfo, setShowEditInfo] = useState(false);
  const fileInputRef = useRef(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [modalData, setModalData] = useState({ users: [], title: '' });
  const [postsData, setPostsData] = useState(null);
  const [showPostModal, setShowPostModal]= useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyProfile();
        setAdmin(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        toast.error("Failed to fetch profile");
      }
    };

    fetchData();
  }, []);

  const handleAvatarChange = () => {
    fileInputRef.current?.click(); // Trigger hidden file input
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
    const response = await axios.patch("/users/profile-picture", formData); 
       console.log(response)
      const data = await response.data;
    
      if (response.ok) {
        setAdmin((prev) => ({ ...prev, profilePic: data.user.profilePic }));
        toast.success("Profile picture updated!");
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };



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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-8"
    >
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <motion.h1 variants={itemVariants} className="text-3xl font-bold text-gray-800 mb-6">
        Admin Profile
      </motion.h1>

      <motion.div variants={itemVariants}>
      <ProfileCard
  avatarUrl={admin?.profilePic}
  name={admin?.name}
  role="Admin"
  email={admin?.email}
  gender={admin?.gender}
  age={admin?.age}
  onAvatarChange={handleAvatarChange}
  points={admin?.points || 0}
  activityLevel={admin?.activityLevel}
  fitnessGoal={admin?.fitnessGoal }
  weight={admin?.weight }
  height={admin?.height }
/>
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8"
      >
        <motion.div variants={itemVariants}>
          <StatsCard value={admin?.posts?.length} label="Posts" onClick={() => handleStatClick('Posts')} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard value={admin?.followers?.length || 0} label="Followers" onClick={() => handleStatClick('Followers')} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard value={admin?.following?.length|| 0} label="Following" onClick={() => handleStatClick('Following')} />
        </motion.div>
      </motion.div>

   <motion.div variants={containerVariants} className="flex flex-col lg:flex-row gap-4 mt-8">
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
  >
    <button
      onClick={() => setShowAddModal(true)}
      className="lg:w-60 flex items-center justify-center gap-2 bg-secondYellow text-gray-800 font-semibold py-2.5 px-4 rounded-2xl shadow-md hover:bg-yellow-400 transition-all duration-300"
    >
      <FiPlus size={18} />
      Add New Admin
    </button>
  </motion.div>

  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
  >
    <button
      onClick={() => setShowEditPass(true)}
      className="lg:w-60 flex items-center justify-center gap-2 bg-secondYellow text-gray-800 font-semibold py-2.5 px-4 rounded-2xl shadow-md hover:bg-yellow-400 transition-all duration-300"
    >
      <FiLock size={18} />
      Change Password
    </button>
  </motion.div>

  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
  >
    <button
      onClick={() => setShowEditInfo(true)}
      className="lg:w-60 flex items-center justify-center gap-2 bg-secondYellow text-gray-800 font-semibold py-2.5 px-4 rounded-2xl shadow-md hover:bg-yellow-400 transition-all duration-300"
    >
      <FiEdit size={18} />
      Update My Info
    </button>
  </motion.div>
</motion.div>


      {showAddModal && (
        <AddAdminModal onAdd={helpers.handleAddNewAdmin} onClose={() => setShowAddModal(false)} />
      )}
      {showEditInfo && (
        <UpdateInfoModal onAdd={helpers.handleEditInfo} onClose={() => setShowEditInfo(false)} />
      )}
      {showEditPass && (
        <ChangePasswordModal onAdd={helpers.handleEditPass} onClose={() => setShowEditPass(false)} />
      )}
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
    </motion.div>
  );
};

export default AdminProfile;
