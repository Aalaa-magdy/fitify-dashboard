
import { User, Calendar, TrendingUp, Ruler } from 'lucide-react';
import InfoCard from './InfoCard';


const PersonalInfoCard = ({ user }) => {
  const personalInfo = [
    { icon: <User className="w-4 h-4" />, label: 'Gender', value: user?.gender || 'Not specified' },
    { icon: <Calendar className="w-4 h-4" />, label: 'Age', value: user?.age ? `${user.age} years` : 'N/A' },
    { icon: <TrendingUp className="w-4 h-4" />, label: 'Weight', value: user?.weight ? `${user.weight} kg` : 'N/A' },
    { icon: <Ruler className="w-4 h-4" />, label: 'Height', value: user?.height ? `${user.height} cm` : 'N/A' },
  ];

  return (
    <InfoCard 
      title="Personal Information" 
      icon={<User className="w-5 h-5" />}
      items={personalInfo}
      color="blue"
    />
  );
};

export default PersonalInfoCard;