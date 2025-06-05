import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar onLogout={logout} />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Outlet /> {/* This will render the nested routes */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;