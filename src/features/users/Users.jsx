import { useState, useEffect } from 'react';
import { User, ChevronRight } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import LoadingSpinner from '../../components/LoadingSpinner';
import UserCard from '../../components/UserCard'
import UserAvatar from '../../components/UserAvatar';
import { getAllUsers } from './api/userApi';
import SearchBar from '../../components/Searchbar';


const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#f9fafb]">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Sidebar */}
      <div className={`w-full pb-10 md:w-[40%] border-r border-gray-200 bg-white transition-all ${selectedUser ? 'hidden md:block' : ''}`}>
        <div className="p-4 border-b shadow-sm bg-white sticky top-0 z-10">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-[#14919B]">Users</h1>
          </div>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <div className="h-[calc(100vh-120px)] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <LoadingSpinner />
            </div>
          ) : filteredUsers.length > 0 ? (
            <div className="px-2 pt-2 pb-4">
              {filteredUsers.map(user => (
                <div
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className={`group flex items-center justify-between gap-3 p-4 mb-2 rounded-lg border cursor-pointer transition-all ${
                    selectedUser?._id === user._id
                      ? 'bg-[#f0fdf4] border-[#14919B]'
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <UserAvatar user={user} />
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-400 group-hover:text-[#14919B]" />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">
                {searchTerm ? 'No matching users found' : 'No users yet'}
              </h3>
              <p className="text-gray-500 mt-1">
                {searchTerm ? 'Try a different search term' : 'Create your first user'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Panel */}
      {selectedUser ? (
        <div className="flex-1 p-2 overflow-y-auto">
          <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-4">
            <UserCard user={selectedUser} />
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
          <div className="text-center max-w-md">
            <User className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-medium text-gray-500">Select a user to view details</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;