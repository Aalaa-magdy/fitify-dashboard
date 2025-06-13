import { motion } from 'framer-motion';
import { 
  Activity, 
  Clock, 
  AlertCircle,
  BarChart2,
  Users,
  Heart,
  TrendingUp
} from "lucide-react";
import StateCard from "./StateCard";
import LoadingSpinner from '../../../components/LoadingSpinner';

const CommunityStats = ({ communityData }) => {
  const colors = {
    mainBlue: '#0E7C86',
    mainGreen: '#6B732A',
    blueDark: '#0A535A',
    gradientBlue: 'linear-gradient(135deg, #0E7C86 0%, #14919B 100%)',
    gradientYellow: 'linear-gradient(135deg, #D8E84E 0%, #ECF87E 100%)'
  };

  return (
    <motion.div 
      className="max-w-7xl mx-auto p-4 md:p-6 space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {communityData.error && communityData.stats && Object.keys(communityData.stats).length > 0 && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="p-4 rounded-lg bg-red-50 border border-red-100 flex items-start gap-3">
            <AlertCircle className="text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-800">{communityData.error}</p>
              <p className="text-xs text-red-600 mt-1">Some statistics may be incomplete or unavailable</p>
            </div>
          </div>
        </motion.div>
      )}

      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl" style={{ background: colors.gradientBlue }}>
            <Activity className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: colors.blueDark }}>Community Dashboard</h2>
            <p className="text-sm text-gray-500">Real-time insights about your community</p>
          </div>
        </div>
        {communityData.lastUpdated && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 shadow-xs">
            <Clock size={16} style={{ color: colors.mainGreen }} />
            <span className="text-sm" style={{ color: colors.mainGreen }}>
              Updated: {communityData.lastUpdated.toLocaleTimeString()}
            </span>
          </div>
        )}
      </header>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <StateCard 
          title="Total Posts" 
          value={communityData.stats?.totalPosts} 
          icon={<BarChart2 size={24} />} 
          index={0} 
          loading={communityData.loading}
          colors={colors}
        />
        <StateCard 
          title="Active Users" 
          value={communityData.stats?.totalUsers} 
          icon={<Users size={24}/>} 
          index={1} 
          loading={communityData.loading}
          colors={colors}
        />
        <StateCard 
          title="Total Likes" 
          value={communityData.stats?.totalLikes} 
          icon={<Heart size={24} />} 
          index={2} 
          loading={communityData.loading}
          colors={colors}
        />
        <StateCard 
          title="Engagement" 
          value={communityData.stats?.totalEngagement} 
          icon={<TrendingUp size={24} />} 
          index={3} 
          loading={communityData.loading}
          colors={colors}
        />
      </motion.div>
    </motion.div>
  );
};

export default CommunityStats;