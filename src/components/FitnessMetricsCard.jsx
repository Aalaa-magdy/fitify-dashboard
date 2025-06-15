
import { Activity, Target, Gauge, Star } from 'lucide-react';
import InfoCard from './InfoCard';


const FitnessMetricsCard = ({ user }) => {
  const fitnessMetrics = [
    { icon: <Activity className="w-4 h-4" />, label: 'Activity Level', value: user?.activityLevel || 'Not set' },
    { icon: <Target className="w-4 h-4" />, label: 'Fitness Goal', value: user?.fitnessGoal || 'Not set' },
    { icon: <Gauge className="w-4 h-4" />, label: 'Fitness Level', value: user?.fitnessLevel || 'Beginner' },
    { icon: <Star className="w-4 h-4" />, label: 'Points', value: user?.points ? `${user.points} pts` : '0 pts' },
  ];

  return (
    <InfoCard 
      title="Fitness Metrics" 
      icon={<Activity className="w-5 h-5" />}
      items={fitnessMetrics}
      color="pink"
    />
  );
};

export default FitnessMetricsCard;