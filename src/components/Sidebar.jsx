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
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-72 h-screen border-r border-gray-200 bg-white shadow-lg">
        {/* Logo with Glow Effect */}
        <div className="flex items-center justify-center h-18 my-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5fcdd4] to-[#e3f542] font-bold p-5 text-5xl hover:drop-shadow-[0_0_8px_rgba(20,145,155,0.6)] transition-all duration-500">
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
                  flex w-full items-center px-4 py-3 text-[15px] font-medium rounded-lg transition-all duration-300 
                  ${isActive 
                    ? 'bg-gradient-to-r from-[#e0f7fa] to-[#b2ebf2] text-[#14919B] shadow-inner shadow-[#88f2fa]/50 border-l-4 border-[#14919B]' 
                    : 'text-gray-600 hover:bg-gradient-to-r hover:from-[#f0fdff] hover:to-white hover:text-[#14919B] hover:shadow-md hover:shadow-[#88f2fa]/30 hover:border-l-4 hover:border-[#88f2fa]'}
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
            className="flex items-center w-full px-4 py-3 text-xl font-medium text-gray-600 rounded-lg hover:bg-gradient-to-r hover:from-[#f0fdff] hover:to-white hover:text-[#14919B] hover:shadow-md hover:shadow-[#88f2fa]/30 transition-all duration-300"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3 text-gray-500" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;