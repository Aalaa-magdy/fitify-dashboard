import { NavLink } from 'react-router-dom';
import { HomeIcon, UserIcon, FireIcon, UsersIcon, TrophyIcon, CogIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

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
    <div className="hidden ml-7  md:flex md:flex-shrink-0 bg-gray-100 border-r border-gray-200 rounded-xl border-7 w-[13%] mt-3 mb-1">
      <div className="flex flex-col w-64 h-screen  ">
        {/* Logo - Simplified */}
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
          <span className="text-xl font-semibold text-gray-800">
            Fitify
          </span>
        </div>
        
        {/* Navigation - Cleaner Design */}
        <div className="flex flex-col flex-grow px-2 py-4 overflow-y-auto">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center px-3 py-2.5 text-sm font-medium rounded-md mx-2
                  ${isActive 
                    ? 'bg-gray-100 text-[#14919B]' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <item.icon className='w-5 h-5 mr-3' />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        
        {/* Logout Button - Bottom Aligned */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;