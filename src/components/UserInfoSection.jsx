import React from 'react';
import { 
  User, 
  Award, 
  Mail, 
  Calendar, 
  Star, 
  Activity, 
  Target, 
  TrendingUp, 
  Ruler,
  Gauge,
  Trophy,
  Scale
} from 'lucide-react';

const colors = {
  mainBlue: '#0E7C86',
  mainYellow: '#D8E84E',
  mainGreen: '#6B732A',
  secondYellow: '#E0F06D',
  blueLight: '#D8F3F5',
  yellowLight: '#F5F9D5',
  greenLight: '#E8ECD8',
  blueDark: '#0A535A'
};

const UserInfoSection = ({ user }) => {
  const userData = {
    personal: [
      { icon: <User className="w-3 h-3" />, label: 'Gender', value: user?.gender || 'Not specified' },
      { icon: <Calendar className="w-3 h-3" />, label: 'Age', value: user?.age ? `${user.age} years` : 'N/A' },
      { icon: <TrendingUp className="w-3 h-3" />, label: 'Weight', value: user?.weight ? `${user.weight} kg` : 'N/A' },
      { icon: <Ruler className="w-3 h-3" />, label: 'Height', value: user?.height ? `${user.height} cm` : 'N/A' },
  
    ],
    fitness: [
      { icon: <Activity className="w-3 h-3" />, label: 'Activity', value: user?.activityLevel || 'Not set' },
      { icon: <Target className="w-3 h-3" />, label: 'Goal', value: user?.fitnessGoal || 'Not set' },
      { icon: <Gauge className="w-3 h-3" />, label: 'Level', value: user?.fitnessLevel || 'Beginner' }
    ],
    // stats: [
    //   { icon: <Star className="w-3 h-3" />, label: 'Points', value: user?.points ? `${user.points} pts` : '0 pts' },
    //   { icon: <Trophy className="w-3 h-3" />, label: 'Achievements', value: user?.achievements || 'None yet' }
    // ],
  };

  return (
    <div className="w-full space-y-4">
      {/* Compact Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-white rounded-lg shadow-xs border border-gray-100">
        <div>
          <h1 className="text-xl font-bold" style={{ color: colors.blueDark }}>{user?.name || 'User Profile'}</h1>
          <p className="text-xs mt-1 px-2 py-1 rounded-md inline-block" style={{ backgroundColor: colors.blueLight, color: colors.blueDark }}>
            <Mail className="inline mr-1 w-3 h-3" />
            {user?.email || 'No email'}
          </p>
        </div>
        <span 
          className="px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 shadow-xs mt-2 sm:mt-0"
          style={{ 
            backgroundColor: colors.mainBlue,
            color: colors.secondYellow
          }}
        >
          <Award className="w-3 h-3" />
          {user?.role || 'Member'}
        </span>
      </div>

      {/* Compact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <InfoCard 
          title="Personal" 
          icon={<User className="w-4 h-4" />}
          items={userData.personal}
          color="blue"
        />
        <InfoCard 
          title="Fitness" 
          icon={<Activity className="w-4 h-4" />}
          items={userData.fitness}
          color="green"
        />
    
      </div>
    </div>
  );
};

// Compact Card Component
const InfoCard = ({ title, icon, items, color }) => {
  const colorConfig = {
    blue: {
      bg: colors.blueLight,
      text: colors.blueDark,
      iconBg: colors.mainBlue,
      iconColor: colors.secondYellow
    },
    yellow: {
      bg: colors.yellowLight,
      text: colors.mainGreen,
      iconBg: colors.mainYellow,
      iconColor: colors.mainGreen
    },
    green: {
      bg: colors.greenLight,
      text: colors.mainGreen,
      iconBg: colors.mainGreen,
      iconColor: colors.secondYellow
    }
  };


  const currentColor = colorConfig[color] || colorConfig.blue;


  return (
    <div 
      className="rounded-lg border p-3 transition-all hover:shadow-sm h-full"
      style={{ 
        backgroundColor: currentColor.bg,
        borderColor: currentColor.bg
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div 
          className="p-1.5 rounded-md flex items-center justify-center"
          style={{ 
            backgroundColor: currentColor.iconBg,
            color: currentColor.iconColor
          }}
        >
          {icon}
        </div>
        <h3 
          className="font-medium text-sm"
          style={{ color: currentColor.text }}
        >
          {title}
        </h3>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <div 
              className="p-1 mt-0.5 rounded-sm flex items-center justify-center"
              style={{ 
                backgroundColor: 'white',
                color: currentColor.iconBg
              }}
            >
              {item.icon}
            </div>
            <div>
              <p 
                className="text-[10px] leading-none"
                style={{ color: currentColor.text }}
              >
                {item.label}
              </p>
              <p className="text-xs font-medium text-gray-800 leading-tight">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInfoSection;