import { Users, Award, Dumbbell, CheckCircle } from "lucide-react";
import { motion } from 'framer-motion';
import StatsCard from "../../../components/StatsCard";
import LoadingSpinner from '../../../components/LoadingSpinner';

const FitnessStats = ({ stats, loading }) => {
  const statCards = [
    { 
      title: "Total Users", 
      value: stats?.users || 0, 
      icon: Users, 
      bg: "bg-gradient-to-br from-[#27a1aa] to-[#023a49] text-white" 
    },
    { 
      title: "Admins", 
      value: stats?.admins || 0, 
      icon: Award, 
      bg: "bg-white text-black" 
    },
    { 
      title: "Exercises", 
      value: stats?.exercises || 0, 
      icon: Dumbbell, 
      bg: "bg-white text-black" 
    },
    { 
      title: "Completed Sessions", 
      value: stats?.completedSessions || 0, 
      icon: CheckCircle, 
      bg: "bg-white" 
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {loading ? (
        Array(4).fill().map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg h-28 animate-pulse"></div>
        ))
      ) : (
        statCards.map((stat, i) => (
          <StatsCard 
            key={i}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            bg={stat.bg}
            index={i}
          />
        ))
      )}
    </div>
  );
};

export default FitnessStats;