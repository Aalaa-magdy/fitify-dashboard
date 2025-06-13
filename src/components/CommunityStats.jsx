import { useEffect, useState } from 'react';
import { 
  FiActivity, 
  FiBarChart2, 
  FiHeart, 
  FiRepeat, 
  FiUser, 
  FiAward, 
  FiClock,
  FiTrendingUp,
  FiUsers,
  FiMessageSquare,
  FiAlertCircle,
  FiRefreshCw
} from 'react-icons/fi';
import axios from '../api/axiosInstance';
import LoadingSpinner from './LoadingSpinner';
import UserAvatar from './UserAvatar';
import { motion } from 'framer-motion';

const colors = {
  mainBlue: '#0E7C86',
  mainYellow: '#D8E84E',
  mainGreen: '#6B732A',
  secondYellow: '#E0F06D',
  blueLight: '#D8F3F5',
  yellowLight: '#F5F9D5',
  greenLight: '#E8ECD8',
  blueDark: '#0A535A',
  errorRed: '#DC2626',
  gradientBlue: 'linear-gradient(135deg, #0E7C86 0%, #14919B 100%)',
  gradientYellow: 'linear-gradient(135deg, #D8E84E 0%, #ECF87E 100%)'
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

const statCardVariants = {
  hover: {
    y: -5,
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
    transition: { duration: 0.2 }
  }
};

const CommunityStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/stats/community');
      setStats(response.data);
      setLastUpdated(new Date());
      setRetryCount(0);
    } catch (err) {
      console.error('Error fetching community stats:', err);
      
      let errorMessage = 'Failed to load community statistics';
      if (err.response) {
        if (err.response.status === 404) {
          errorMessage = 'Stats endpoint not found';
        } else if (err.response.status === 500) {
          errorMessage = 'Server error occurred';
        } else if (err.response.status === 403) {
          errorMessage = 'Access to stats is restricted';
        }
      } else if (err.request) {
        errorMessage = 'Network error - please check your connection';
      }
      
      setError(errorMessage);
      setRetryCount(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const intervalId = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  const renderErrorState = () => (
    <motion.div 
      className="max-w-4xl mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="border rounded-xl p-6 text-center" style={{ background: colors.gradientBlue, borderColor: colors.errorRed }}>
        <div className="flex flex-col items-center">
          <div className="p-3 mb-4 rounded-full bg-white/20">
            <FiAlertCircle className="text-white text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Error Loading Stats</h2>
          <p className="mb-4 text-white/90">{error}</p>
          
          {retryCount < 3 ? (
            <motion.button
              onClick={fetchStats}
              className="mt-3 px-5 py-2.5 rounded-lg font-semibold mx-auto flex items-center gap-2"
              style={{ background: colors.gradientYellow, color: colors.mainGreen }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              {loading ? <><FiRefreshCw className="animate-spin" /> Retrying...</> : <><FiRefreshCw /> Try Again</>}
            </motion.button>
          ) : (
            <div className="text-white/80 text-sm mt-3">
              <p>Still having trouble? Please try again later.</p>
              <p className="mt-1">Last attempted: {new Date().toLocaleTimeString()}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  const renderUserInfo = (user) => (
    <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }}>
      <UserAvatar user={user} size="lg" />
      <div>
        <span className="font-bold text-gray-900">{user.name}</span>
      </div>
    </motion.div>
  );

  const renderPostInfo = (post) => (
    <motion.article 
      className="p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 bg-white h-full flex flex-col"
      whileHover={{ scale: 1.01 }}
      variants={cardVariants}
    >
      {post?.user && renderUserInfo(post.user)}
      <p className="mt-3 text-gray-800 line-clamp-3 flex-grow">{post?.content}</p>
      
      {post?.imageUrls?.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-2">
          {post.imageUrls.slice(0, 2).map((img, index) => (
            <motion.img 
              key={index}
              src={img} 
              alt={`Post content ${index}`}
              className="rounded-lg object-cover h-24 w-full"
              whileHover={{ scale: 1.03 }}
            />
          ))}
        </div>
      )}
      
      <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
        <span className="flex items-center gap-1">
          <FiHeart className="text-red-500" /> {post?.likes?.length || 0}
        </span>
        <span className="flex items-center gap-1">
          <FiRepeat className="text-blue-500" /> {post?.shares || 0}
        </span>
        <span className="flex items-center gap-1">
          <FiMessageSquare className="text-green-500" /> {post?.comments?.length || 0} comments
        </span>
      </div>
      {post?.createdAt && (
        <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
          <FiClock size={12} />
          <time dateTime={post.createdAt}>
            {new Date(post.createdAt).toLocaleString()}
          </time>
        </div>
      )}
    </motion.article>
  );

  const renderStatCard = (title, value, icon, bgColor, textColor, index) => {
    const hasError = value === undefined || value === null;
    
    return (
      <motion.div 
        className={`p-5 rounded-xl flex items-center gap-4 transition-all cursor-default ${hasError ? 'opacity-70' : ''}`}
        style={{ background: bgColor.includes('gradient') ? bgColor : bgColor }}
        variants={statCardVariants}
        whileHover={hasError ? {} : "hover"}
        initial="hidden"
        animate="visible"
        custom={index}
        transition={{ delay: index * 0.1 }}
      >
        <div className={`p-3 rounded-lg ${bgColor.includes('gradient') ? 'bg-white/20' : 'bg-white'} shadow-sm`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium" style={{ color: textColor }}>{title}</p>
          {hasError ? (
            <div className="flex items-center gap-1 mt-1">
              <FiAlertCircle className="text-red-500" size={14} />
              <span className="text-xs text-red-500">N/A</span>
            </div>
          ) : (
            <p className="text-2xl font-bold" style={{ color: colors.blueDark }}>
              {loading ? <LoadingSpinner size="small" /> : (value || 0)}
            </p>
          )}
        </div>
      </motion.div>
    );
  };

  if (error && (!stats || Object.keys(stats).length === 0)) {
    return renderErrorState();
  }

  return (
    <motion.div 
      className="max-w-7xl mx-auto p-4 md:p-6 space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {error && stats && Object.keys(stats).length > 0 && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="p-4 rounded-lg bg-red-50 border border-red-100 flex items-start gap-3">
            <FiAlertCircle className="text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-800">{error}</p>
              <p className="text-xs text-red-600 mt-1">Some statistics may be incomplete or unavailable</p>
            </div>
          </div>
        </motion.div>
      )}

      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl" style={{ background: colors.gradientBlue }}>
            <FiActivity className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: colors.blueDark }}>Community Dashboard</h2>
            <p className="text-sm text-gray-500">Real-time insights about your community</p>
          </div>
        </div>
        {lastUpdated && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 shadow-xs">
            <FiClock size={16} style={{ color: colors.mainGreen }} />
            <span className="text-sm" style={{ color: colors.mainGreen }}>
              Updated: {lastUpdated.toLocaleTimeString()}
            </span>
          </div>
        )}
      </header>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {renderStatCard('Total Posts', stats?.totalPosts, <FiBarChart2 size={24} style={{ color: colors.blueDark }} />, colors.blueLight, colors.blueDark, 0)}
        {renderStatCard('Active Users', stats?.totalUsers, <FiUsers size={24} style={{ color: colors.mainGreen }} />, colors.greenLight, colors.mainGreen, 1)}
        {renderStatCard('Total Likes', stats?.totalLikes, <FiHeart size={24} style={{ color: '#EF4444' }} />, '#FEE2E2', '#EF4444', 2)}
        {renderStatCard('Engagement', stats?.totalEngagement, <FiTrendingUp size={24} style={{ color: colors.mainBlue }} />, colors.gradientBlue, 'white', 3)}
      </motion.div>

      <motion.section className="space-y-6" variants={cardVariants}>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ background: colors.gradientYellow }}>
            <FiAward className="text-white" />
          </div>
          <h3 className="text-xl font-bold" style={{ color: colors.blueDark }}>Top Performers</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Most Liked Post */}
          <motion.div 
            className="rounded-xl p-5 shadow-sm border bg-white h-full flex flex-col"
            style={{ borderColor: colors.mainYellow }}
            variants={cardVariants}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-full bg-red-100">
                <FiHeart className="text-red-500" />
              </div>
              <h4 className="font-bold" style={{ color: colors.blueDark }}>Most Liked Post</h4>
            </div>
            {loading ? (
              <div className="flex justify-center py-8 flex-grow">
                <LoadingSpinner />
              </div>
            ) : stats?.mostLikedPost ? (
              renderPostInfo(stats.mostLikedPost)
            ) : (
              <div className="py-6 text-center rounded-lg bg-gray-50 flex-grow flex items-center justify-center">
                <p className="text-gray-500">No post data available</p>
              </div>
            )}
          </motion.div>

          {/* Most Shared Post */}
          <motion.div 
            className="rounded-xl p-5 shadow-sm border bg-white h-full flex flex-col"
            style={{ borderColor: colors.mainYellow }}
            variants={cardVariants}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-full bg-blue-100">
                <FiRepeat className="text-blue-500" />
              </div>
              <h4 className="font-bold" style={{ color: colors.blueDark }}>Most Shared Post</h4>
            </div>
            {loading ? (
              <div className="flex justify-center py-8 flex-grow">
                <LoadingSpinner />
              </div>
            ) : stats?.mostSharedPost ? (
              renderPostInfo(stats.mostSharedPost)
            ) : (
              <div className="py-6 text-center rounded-lg bg-gray-50 flex-grow flex items-center justify-center">
                <p className="text-gray-500">No post data available</p>
              </div>
            )}
          </motion.div>

          {/* Community Star */}
          <motion.div 
            className="rounded-xl p-5 shadow-sm border bg-white h-full flex flex-col"
            style={{ borderColor: colors.mainBlue }}
            variants={cardVariants}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-full bg-green-100">
                <FiUser className="text-green-500" />
              </div>
              <h4 className="font-bold" style={{ color: colors.blueDark }}>Community Star</h4>
            </div>
            {loading ? (
              <div className="flex justify-center py-8 flex-grow">
                <LoadingSpinner />
              </div>
            ) : stats?.mostActiveUser ? (
              <div className="flex flex-col gap-4 flex-grow">
                {renderUserInfo(stats.mostActiveUser)}
                {stats.mostActiveUser.bio && (
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {stats.mostActiveUser.bio}
                  </p>
                )}
                <div className="grid grid-cols-3 gap-2 mt-auto">
                  <div className="text-center p-2 rounded-lg bg-gray-50">
                    <p className="text-xs font-medium" style={{ color: colors.mainBlue }}>Posts</p>
                    <p className="text-lg font-bold mt-1" style={{ color: colors.blueDark }}>
                      {stats.mostActiveUser.postCount || 0}
                    </p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-gray-50">
                    <p className="text-xs font-medium" style={{ color: colors.mainBlue }}>Likes</p>
                    <p className="text-lg font-bold mt-1" style={{ color: colors.blueDark }}>
                      {stats.mostActiveUser.likesReceived || 0}
                    </p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-gray-50">
                    <p className="text-xs font-medium" style={{ color: colors.mainBlue }}>Shares</p>
                    <p className="text-lg font-bold mt-1" style={{ color: colors.blueDark }}>
                      {stats.mostActiveUser.sharesReceived || 0}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center rounded-lg bg-gray-50 flex-grow flex items-center justify-center">
                <p className="text-gray-500">No user data available</p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default CommunityStats;