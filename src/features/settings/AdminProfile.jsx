import React, { useEffect, useRef, useState } from 'react';
import { ProfileCard } from '../../components/ProfileCard';
import { StatsCard } from '../../components/StatsCard';
import GradientButton from '../../components/GradientButton';
import { FiPlus, FiLock, FiEdit } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { getMyProfile } from './api/settingsApi';
import { toast } from 'react-toastify';
import * as helpers from './utils/helpers';
import { AddModal } from '../../components/AddModal';
import { EditModal } from '../../components/EditModal';
import axios from '../../api/axiosInstance'


export const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditPass, setShowEditPass] = useState(false);
  const [showEditInfo, setShowEditInfo] = useState(false);
  const fileInputRef = useRef(null);

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
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios("/users/profile-picture", {
        method: "PATCH",
        body: formData,
      });
       console.log(response)
      const data = await response.json();
    
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

  const handleStatClick = (statName) => {
    console.log(`${statName} clicked`);
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
          avatarUrl={admin?.profilePic || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"}
          name={admin?.name}
          role="Admin"
          email={admin?.email}
          gender={admin?.gender}
          age={admin?.age}
          onAvatarChange={handleAvatarChange}
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8"
      >
        <motion.div variants={itemVariants}>
          <StatsCard value={45} label="Posts" onClick={() => handleStatClick('Posts')} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard value="1.2K" label="Followers" onClick={() => handleStatClick('Followers')} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard value={86} label="Following" onClick={() => handleStatClick('Following')} />
        </motion.div>
      </motion.div>

      <motion.div variants={containerVariants} className="flex flex-col lg:flex-row gap-4 mt-8">
        <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <GradientButton className="lg:w-60" onClick={() => setShowAddModal(true)}>
            <FiPlus size={18} className="mr-2" />
            Add New Admin
          </GradientButton>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <GradientButton className="lg:w-60" onClick={() => setShowEditPass(true)}>
            <FiLock size={18} className="mr-2" />
            Change Password
          </GradientButton>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <GradientButton className="lg:w-60" onClick={() => setShowEditInfo(true)}>
            <FiEdit size={18} className="mr-2" />
            Update My Info
          </GradientButton>
        </motion.div>
      </motion.div>

      {showAddModal && (
        <AddModal onAdd={helpers.handleAddNewAdmin} onClose={() => setShowAddModal(false)} />
      )}
      {showEditInfo && (
        <EditModal onAdd={helpers.handleEditInfo} onClose={() => setShowEditInfo(false)} />
      )}
      {showEditPass && (
        <EditModal onAdd={helpers.handleEditPass} onClose={() => setShowEditPass(false)} />
      )}
    </motion.div>
  );
};

export default AdminProfile;
