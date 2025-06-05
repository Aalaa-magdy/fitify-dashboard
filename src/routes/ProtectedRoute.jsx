import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Save the location so we can redirect back after login
    localStorage.setItem('redirectPath', location.pathname);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />; // Allow nested routes to render
};

export default ProtectedRoute;
