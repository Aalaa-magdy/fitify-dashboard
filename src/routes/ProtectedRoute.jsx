import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

    if (loading) {
      return <LoadingSpinner />;
    }
  if (!isAuthenticated) {
    // Save the location so we can redirect back after login
    localStorage.setItem('redirectPath', location.pathname);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />; // Allow nested routes to render
};

export default ProtectedRoute;
