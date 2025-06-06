import { NavLink } from 'react-router-dom';
import { HomeIcon, UserIcon, FireIcon, UsersIcon, TrophyIcon, CogIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const Sidebar = ({ onLogout }) => {
  console.log("from sidebar")
  const navItems = [
    { name: 'Dashboard', icon: HomeIcon, path: 'dashboard' },
    { name: 'Workouts', icon: FireIcon, path: 'workouts' },
    { name: 'Exercises', icon: UserIcon, path: 'exercises' },
    { name: 'Challenges', icon: TrophyIcon, path: 'challenges' },
    { name: 'Users', icon: UsersIcon, path: 'users' },
    { name: 'Settings', icon: CogIcon, path: 'settings' },
  ];

  return (
    <div className="hidden  md:flex md:flex-shrink-0">
      <div className="flex flex-col w-72 h-screen border-r  border-gray-200 bg-white shadow-lg">
        {/* Logo with Glow Effect */}
        <div className="flex items-center justify-center h-24  my-8">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14919B] to-[#4ade80] font-bold text-6xl hover:from-[#4ade80] hover:to-[#14919B] transition-all duration-500 hover:drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]">
            Fitify
          </span>
        </div>
        
        {/* Navigation */}
        <div className="flex flex-col flex-grow px-7 py-4 overflow-y-auto">
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  flex w-full  items-center px-4 py-3 text-[17px] font-medium rounded-lg transition-all duration-300 
                  ${isActive 
                    ? 'bg-gradient-to-r from-green-100 to-green-50 text-green-700 shadow-inner shadow-green-200/50 border-l-4 border-green-400' 
                    : 'text-gray-600 hover:bg-gradient-to-r hover:from-green-50 hover:to-white hover:text-green-700 hover:shadow-md hover:shadow-green-200/30 hover:border-l-4 hover:border-green-300'}
                `}
              >
                <item.icon className='w-6 h-6 mr-3' />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        
        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="flex items-center w-full px-4 py-3 text-xl font-medium text-gray-600 rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-white hover:text-green-700 hover:shadow-md hover:shadow-green-200/30 transition-all duration-300"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3 text-gray-500 " />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;