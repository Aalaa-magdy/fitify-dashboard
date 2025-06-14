import { NavLink } from 'react-router-dom';
import { HomeIcon, UserIcon, FireIcon, UsersIcon, TrophyIcon, CogIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import logo from '../assets/log-1.png';

const Sidebar = ({ onLogout }) => {
  const navItems = [
    { name: 'Dashboard', icon: HomeIcon, path: 'dashboard' },
    { name: 'Workouts', icon: FireIcon, path: 'workouts' },
    { name: 'Exercises', icon: UserIcon, path: 'exercises' },
    { name: 'Challenges', icon: TrophyIcon, path: 'challenges' },
    { name: 'Users', icon: UsersIcon, path: 'users' },
    { name: 'Settings', icon: CogIcon, path: 'settings' },
  ];

  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="hidden fixed ml-7 mt-2 border-2 shadow-lg rounded-xl border-gray-400/10 md:flex flex-col bg-gray-100 h-screen"
    >
      <div className="flex flex-col w-64 h-full">
        {/* Logo */}
        <div className="flex items-center justify-center py-6 border-b border-gray-200">
          <motion.img 
            src={logo} 
            alt="Fitify Logo" 
            className="h-28 w-44"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </div>
        
        {/* Navigation */}
        <div className="flex flex-col flex-grow px-4 py-6 overflow-y-auto">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center px-4 py-3 text-md font-medium rounded-lg
                    transition-all duration-200 relative
                    ${isActive 
                      ? 'bg-white text-[#14919B] shadow-sm' 
                      : 'text-gray-600 hover:bg-white hover:text-gray-900'}
                  `}
                >
                  {/* Active state right border */}
                  {({ isActive }) => isActive && (
                    <motion.span 
                      className="absolute right-0 top-0 h-full w-2 bg-[#14919B] rounded-l-lg"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <item.icon className='w-5 h-5 mr-3' />
                  {item.name}
                </NavLink>
              </motion.div>
            ))}
          </nav>
        </div>
        
        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <motion.button
            onClick={onLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-200"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
            Logout
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;