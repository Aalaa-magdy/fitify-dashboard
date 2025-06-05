// src/pages/Dashboard.jsx
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div >
      <h1>Admin Dashboard</h1>
      <button onClick={logout} >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
