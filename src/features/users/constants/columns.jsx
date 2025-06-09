import { User } from 'lucide-react';

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
      <button
        onClick={() => alert(`Details for ${row.name}`)}
        className="text-sm px-3 py-1 bg-mainBlue text-white rounded "
      >
        Details
      </button>
    ),
  },
];
