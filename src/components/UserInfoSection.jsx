
import { Award, Mail } from 'lucide-react';
import PersonalInfoCard from './PersonalInfoCard';
import FitnessMetricsCard from './FitnessMetricsCard';

const colors = {
  mainBlue: '#0E7C86',
  secondYellow: '#E0F06D',
  blueLight: '#f0fdf4',
  blueDark: '#0A535A'
};

const UserInfoSection = ({ user }) => {
  return (
    <div className="w-full space-y-4 px-4 py-2">
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-2 bg-white rounded-xl shadow-sm ">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: colors.blueDark }}>
            {user?.name || 'User Profile'}
          </h1>
          <div className="flex items-center mt-2 gap-2">
            <span className="text-sm px-3 py-1 rounded-full flex items-center gap-1.5"
              style={{ 
                backgroundColor: colors.blueLight,
                color: colors.blueDark
              }}
            >
              <Mail className="w-4 h-4" />
              {user?.email || 'No email provided'}
            </span>
          </div>
        </div>
        <span 
          className="px-3 py-1.5 text-sm font-semibold rounded-full flex items-center gap-1.5 mt-2 sm:mt-0"
          style={{ 
            backgroundColor: colors.mainBlue,
            color: colors.secondYellow,
            boxShadow: '0 2px 4px rgba(14, 124, 134, 0.2)'
          }}
        >
          <Award className="w-4 h-4" />
          {user?.role || 'Member'}
        </span>
      </div>

      {/* Enhanced Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PersonalInfoCard user={user} />
        <FitnessMetricsCard user={user} />
      </div>
    </div>
  );
};

export default UserInfoSection;