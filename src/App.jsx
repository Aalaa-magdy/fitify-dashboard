import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/AdminLogin';
import DashboardLayout from './pages/DashboardLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Workouts from './features/workouts/Workouts';
import Home from './features/home/Home';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            {/* Use empty path for layout route */}
            <Route element={<DashboardLayout />}>
              <Route index element={<Home />} /> {/* This handles the root path */}
              <Route path="/dashboard" element={<Home />} />
              <Route path="/workouts" element={<Workouts />} />
              {/* Add other routes here */}
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}