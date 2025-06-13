import { useEffect, useRef, useState } from 'react';
import { FiPlus, FiLock, FiEdit } from 'react-icons/fi';
import { toast } from 'react-toastify';
import axios from '../../api/axiosInstance';
import { 
  MessageSquare,
  Users,
  UserPlus,
  AlertCircle,
  User,
  Mail,
  Shield
} from 'lucide-react';
import UserMenuModal from '../../components/UserMenuModal';
import UserPostsModal from '../../components/UserPostsModal';
import { AddAdminModal } from '../../components/AddAdminModal';
import ChangePasswordModal from '../../components/ChangePasswordModal';
import UpdateInfoModal from '../../components/UpdateInfoModal';
import FitnessMetricsCard from '../../components/FitnessMetricsCard';
import PersonalInfoCard from '../../components/PersonalInfoCard';
// API
import { getMyProfile, addAdmin, editPassword, editInfo } from './api/settingsApi';
import BarChartProgress from '../../components/BarChartProgress';

export const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditPass, setShowEditPass] = useState(false);
  const [showEditInfo, setShowEditInfo] = useState(false);
  const fileInputRef = useRef(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [modalData, setModalData] = useState({ users: [], title: '' });
  const [postsData, setPostsData] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);

  // Color constants
  const colors = {
    mainBlue: '#0E7C86',
    mainYellow: '#D8E84E',
    mainGreen: '#6B732A',
    secondYellow: '#E0F06D',
    blueLight: '#D8F3F5',
    yellowLight: '#F5F9D5',
    greenLight: '#E8ECD8',
    blueDark: '#0A535A'
  };

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
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.patch("/users/profile-picture", formData); 
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
        const res = await axios.get(`/community/user-posts/${admin._id}`);
        setPostsData(res.data.data);
        setShowPostModal(true);
      } catch (error) {
        console.error(error);
        toast.error(`Failed to load posts`);
      }
    } else {
      try {
        const res = await axios.get(`/users/${statName.toLowerCase()}/${admin._id}`);
        setModalData({users: res.data.data, title: statName});
        setShowUserModal(true);
      } catch (error) {
        console.error(error);
        toast.error(`Failed to load ${statName}`);
      }
    }
  };

  const renderStatCard = (title, value, icon) => {
    const hasError = value === undefined || value === null;
    const valueColor = hasError ? 'text-gray-400' : 'text-gray-800';
    
    return (
      <div 
        key={title}
        className={`rounded-xl bg-white h-full p-4 flex flex-col justify-between border border-gray-200 ${
          hasError ? 'opacity-80' : 'cursor-pointer hover:border-mainBlue hover:shadow-md'
        }`}
        onClick={() => !hasError && handleStatClick(title)}
      >
        <div className="flex items-center justify-between">
          <div className="text-gray-600 text-md font-medium">{title}</div>
          <div className={`p-2 rounded-lg ${
            hasError ? 'bg-gray-100 text-gray-400' : 'bg-mainBlue/10 text-mainBlue'
          }`}>
            {hasError ? <AlertCircle className="w-4 h-4" /> : icon}
          </div>
        </div>
        <div className={`text-2xl font-bold  ${valueColor}`}>
          {hasError ? 'N/A' : value}
        </div>
        <div className={`text-xs  ${
          hasError ? 'text-gray-400' : 'text-mainBlue'
        }`}>
          {hasError ? 'Data unavailable' : 'Click to view details'}
        </div>
      </div>
    );
  };

  return (
    <div className="container max-w-4xl py-6">
      {/* Header with Add Admin button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Profile
        </h1>
        
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 bg-mainBlue text-white font-semibold py-2.5 px-6 rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          <FiPlus size={18} />
          Add New Admin
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Profile Section */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 mb-8 overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div 
              className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer overflow-hidden border-2 border-white shadow-md"
              onClick={handleAvatarChange}
            >
              {admin?.profilePic ? (
                <img 
                  src={admin.profilePic} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="text-gray-400 text-3xl" />
              )}
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                {admin?.name || 'Admin Profile'}
                <span className="text-sm px-3 py-1 rounded-full bg-mainBlue/10 text-mainBlue flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  {admin?.role || 'Admin'}
                </span>
              </h1>
              
              <div className="mt-2 space-y-1">
                <p className="text-gray-600 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-mainBlue" />
                  {admin?.email || 'No email provided'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowEditPass(true)}
              className="flex items-center justify-center gap-2 bg-white border border-mainBlue text-mainBlue hover:bg-mainBlue/5 font-medium py-2 px-4 rounded-lg transition-all"
            >
              <FiLock size={16} />
              Change Password
            </button>
            
            <button
              onClick={() => setShowEditInfo(true)}
              className="flex items-center justify-center gap-2 bg-mainBlue text-white hover:bg-blue-700 font-medium py-2 px-4 rounded-lg transition-all"
            >
              <FiEdit size={16} />
              Edit Profile
            </button>
          </div>
          
        </div>
         {/* Stats section */}
        <div className="w-[70%] mx-10 grid grid-cols-1 md:grid-cols-3 gap-5 my-2">
          {renderStatCard(
            'Posts', 
            admin?.posts?.length, 
            <MessageSquare className="w-5 h-5" />
          )}
          {renderStatCard(
            'Followers', 
            admin?.followers?.length || 0, 
            <Users className="w-5 h-5" />
          )}
          {renderStatCard(
            'Following', 
            admin?.following?.length || 0, 
            <UserPlus className="w-5 h-5" />
          )}
        </div>
      </div>

    

      {/* admin personal info section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-4xl ">
        <PersonalInfoCard user={admin} />
        <FitnessMetricsCard user={admin} />
        <div className='col-span-2'>
          <BarChartProgress user={admin} />
        </div>
        
       
      </div>

     

      {/* Modals */}
      {showAddModal && (
        <AddAdminModal onAdd={addAdmin} onClose={() => setShowAddModal(false)} />
      )}
      {showEditInfo && (
        <UpdateInfoModal onUpdate={editInfo} onClose={() => setShowEditInfo(false)} />
      )}
      {showEditPass && (
        <ChangePasswordModal onChangePassword={editPassword} onClose={() => setShowEditPass(false)} />
      )}
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

export default AdminProfile;