import { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import Table from '../../components/Table';
import { columns } from './constants/columns';
import { getAllUsers } from './api/userApi';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/LoadingSpinner';
import GradientButton from '../../components/GradientButton';
import ProfileAvatar from '../../components/ProfileAvatar'; // Import fallback avatar component
import { Plus } from 'lucide-react';


const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">User Management</h1>
        <GradientButton 
          variant="primary"
          className='w-40'
          onClick={() => console.log('Add user clicked')}
        >
            <Plus className="w-5 h-5 text-white" />
          Add User
        </GradientButton>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner  />
        </div>
      ) : (
        <Table 
          columns={columns} 
          data={users} 
        />
      )}
    </div>
  );
};

export default UserTable;
