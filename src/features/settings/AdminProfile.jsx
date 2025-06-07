// pages/AdminProfile.js
import React, { useEffect, useState } from 'react';
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

export const AdminProfile = () => {
 const [admin, setAdmin] = useState(null);
 const [showAddModal, setShowAddModal] = useState(false);
 const [showEditPass, setShowEditPass] = useState(false);
 const [showEditInfo, setShowEditInfo] = useState(false);

useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getMyProfile();
      setAdmin(data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      toast.error("Failed to fetch profil")
    }
  };

  fetchData();
}, []); 

console.log(admin)
  const handleAvatarChange = () => {
    console.log("Change avatar clicked");
    // Implement avatar change logic here
  };

  const handleStatClick = (statName) => {
    console.log(`${statName} clicked`);
    // Navigate to respective page
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-8"
    >
      <motion.h1 
        variants={itemVariants}
        className="text-3xl font-bold text-gray-800 mb-6"
      >
        Admin Profile
      </motion.h1>
      
      {/* Profile Card */}
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

      {/* Stats Cards */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8"
      >
        <motion.div variants={itemVariants}>
          <StatsCard 
            value={45} 
            label="Posts" 
            onClick={() => handleStatClick('Posts')} 
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard 
            value="1.2K" 
            label="Followers" 
            onClick={() => handleStatClick('Followers')} 
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard 
            value={86} 
            label="Following" 
            onClick={() => handleStatClick('Following')} 
          />
        </motion.div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        variants={containerVariants}
        className="flex flex-col lg:flex-row gap-4 mt-8"
      >
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <GradientButton className='lg:w-60'
          onClick = {()=> {setShowAddModal(true)}}>
            <FiPlus size={18} className="mr-2" />
            Add New Admin
          </GradientButton>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <GradientButton className='lg:w-60'
          onClick = {()=>{setShowEditPass(true)}}>
            <FiLock size={18} className="mr-2" />
            Change Password
          </GradientButton>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <GradientButton className='lg:w-60'
            onClick= {()=>{setShowEditInfo(true)}}>
            <FiEdit size={18} className="mr-2" />
            Update My Info
          </GradientButton>
        </motion.div>
      </motion.div>

       {showAddModal && (
              <AddModal
                onAdd={helpers.handleAddNewAdmin}
                onClose={() => setShowAddModal(false)}
              />
            )}
           {showEditInfo && (
              <EditModal
                onAdd={helpers.handleEditInfo}
                onClose={() => setShowAddModal(false)}
              />
            )}   
               {showEditPass && (
              <EditModal
                onAdd={helpers.handleEditPass}
                onClose={() => setShowAddModal(false)}
              />
            )} 
    </motion.div>
  );
};

export default AdminProfile;