import { User, Trash2, ChevronRight } from 'lucide-react';
import { FiUserCheck } from 'react-icons/fi';

export const columns = [
  {
    header: 'Profile',
    accessor: 'profilePic',
    cell: (row) =>
      row.profilePic ? (
        <img
          src={row.profilePic}
          alt={row.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold select-none">
        {row.name.charAt(0).toUpperCase() || <User />}
      </div>
      ),
  },
  {
    header: 'Name',
    accessor: 'name',
  },
  {
    header: 'Email',
    accessor: 'email',
  },
  {
    header: 'Actions',
    accessor: 'actions',
    cell: (row) => (
    <div className='flex gap-2'>

            <div className="relative group inline-block">
      <button
        onClick={()=>{console.log(row)}}
        className="flex items-center justify-center bg-secondYellow text-gray-800 p-3 border border-mainGreen rounded-full shadow-md transition duration-300"
      >
        <FiUserCheck size={18} />
      </button>

      {/* Tooltip */}
      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
        Change Role
      </div>
    </div>
      <button 
              onClick={()=>{}}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-white hover:text-red-500 transition-all duration-300 border-2 border-red-500 shadow-md hover:shadow-lg transform hover:scale-110"
            >
              <Trash2 size={16} />
            </button>

              <button className="flex items-center text-sm font-medium text-[#14919B] group-hover:text-[#0e6b73] transition-colors duration-300">
                View Details
                <ChevronRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
    </div>
    ),
  },
];
