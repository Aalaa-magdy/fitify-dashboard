import { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getAllUsers } from './api/userApi';
import UserCard from '../../components/UserCard';
import UserAvatar from '../../components/UserAvatar';
import SearchBar from '../../components/Searchbar';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">User Management</h1>
         </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      ) : filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <User size={40} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-700">No users found</h3>
          <p className="text-gray-500 mt-1">
            {searchTerm ? 'Try a different search term' : 'Add your first user to get started'}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserTable;
