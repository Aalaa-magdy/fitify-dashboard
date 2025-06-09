import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './pages/DashboardLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword'
import Workouts from './features/workouts/Workouts';
import Home from './features/home/Home';
import AdminLogin from './pages/AdminLogin';
import AdminProfile from './features/settings/AdminProfile';
import Exercises from './features/exercises/exercises';

export default function App() {
  return (
   <BrowserRouter>
  <AuthProvider>
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected Routes with Layout */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Home />} />
          <Route path = "exercises" element={<Exercises/>}/>
          <Route path="workouts" element={<Workouts />} />
          <Route path="settings" element={<AdminProfile />} />
          {/* Add more nested routes here */}
        </Route>
      </Route>
    </Routes>
    <ToastContainer />
  </AuthProvider>
</BrowserRouter>

  );
}