import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import Leaderboard from "../../components/Leaderboard";
import GenderPieChart from "../../components/GenderPieChart";
import UserAgeRunwayChart from "../../components/UserAgeRunwayChart";
import AllUsersProgressChart from "../../components/AllUsersProgressChart";
import { 
  Users, 
  Dumbbell, 
  CheckCircle, 
  Award, 
  TrendingUp, 
  ChevronRight, 
  Mail, 
  Bell,
  Activity, 
  BarChart2, 
  Heart, 
  Repeat, 
  User, 
  Award as AwardIcon, 
  Clock,
  MessageSquare,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { motion } from 'framer-motion';
import LoadingSpinner from '../../components/LoadingSpinner';
import UserAvatar from '../../components/UserAvatar';
import UserGrowthChart from "../../components/UserGrowthAreaChart";

const Home = () => {
  // Fitness stats state
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ users: 0, admins: 0, exercises: 0, completedSessions: 0, males: 0, females: 0 });
  const [topUsers, setTopUsers] = useState(null);
  const [lastLeaderboard, setLastLeaderboard] = useState(null);

  // Community stats state
  const [communityStats, setCommunityStats] = useState(null);
  const [communityLoading, setCommunityLoading] = useState(true);
  const [communityError, setCommunityError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // Colors for community stats
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

  // Animation variants
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

  // Fetch fitness data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, topUsersRes, leaderboardRes] = await Promise.all([
          axios.get("/stats"),
          axios.get("/users/top-users"),
          axios.get("/challenge-progress/leaderboard/last-session"),
        ]);
        setStats(statsRes.data);
        setTopUsers(topUsersRes.data.data);
        setLastLeaderboard(leaderboardRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fetch community stats
  const fetchCommunityStats = async () => {
    try {
      setCommunityLoading(true);
      setCommunityError(null);
      const response = await axios.get('/stats/community');
      setCommunityStats(response.data);
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
      
      setCommunityError(errorMessage);
      setRetryCount(prev => prev + 1);
    } finally {
      setCommunityLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunityStats();
    const intervalId = setInterval(fetchCommunityStats, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Community stats rendering functions
  const renderCommunityErrorState = () => (
    <motion.div 
      className="max-w-4xl mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="border rounded-xl p-6 text-center" style={{ background: colors.gradientBlue, borderColor: colors.errorRed }}>
        <div className="flex flex-col items-center">
          <div className="p-3 mb-4 rounded-full bg-white/20">
            <AlertCircle className="text-white text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Error Loading Stats</h2>
          <p className="mb-4 text-white/90">{communityError}</p>
          
          {retryCount < 3 ? (
            <motion.button
              onClick={fetchCommunityStats}
              className="mt-3 px-5 py-2.5 rounded-lg font-semibold mx-auto flex items-center gap-2"
              style={{ background: colors.gradientYellow, color: colors.mainGreen }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={communityLoading}
            >
              {communityLoading ? <><RefreshCw className="animate-spin" /> Retrying...</> : <><RefreshCw /> Try Again</>}
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
      <UserAvatar user={user} size="sm" />
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
      <p className=" text-gray-800 mt-3 line-clamp-3  text-xs flex-grow">{post?.content}</p>
      
      {post?.imageUrls?.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-2">
          {post.imageUrls.slice(0, 2).map((img, index) => (
            <motion.img 
              key={index}
              src={img} 
              alt={`Post content ${index}`}
              className="rounded-lg  h-24 w-full"
              whileHover={{ scale: 1.03 }}
            />
          ))}
        </div>
      )}
      
      <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
        <span className="flex items-center gap-1">
          <Heart className="text-red-500" /> {post?.likes?.length || 0}
        </span>
        <span className="flex items-center gap-1">
          <Repeat className="text-blue-500" /> {post?.shares || 0}
        </span>
        <span className="flex items-center gap-1">
          <MessageSquare className="text-green-500" /> {post?.comments?.length || 0} comments
        </span>
      </div>
      {post?.createdAt && (
        <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
          <Clock size={12} />
          <time dateTime={post.createdAt}>
            {new Date(post.createdAt).toLocaleString()}
          </time>
        </div>
      )}
    </motion.article>
  );

  const renderStatCard = (title, value, icon, index) => {
    const hasError = value === undefined || value === null;
    
    return (
      <motion.div 
        className={`rounded-xl  bg-white text-black h-[126px] shadow-lg py-3 flex items-center mr-3 ${hasError ? 'opacity-70' : ''}`}
        variants={statCardVariants}
        whileHover={hasError ? {} : "hover"}
        initial="hidden"
        animate="visible"
        custom={index}
        transition={{ delay: index * 0.1 }}
      >
        <div className="flex items-cente justify-center ml-8">
          <div className="h-12 w-8 flex items-center">
            {icon}
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium mb-4">{title}</h3>
            {hasError ? (
              <div className="flex items-center gap-1">
                <AlertCircle className="text-red-500" size={14} />
                <span className="text-xs text-red-500">N/A</span>
              </div>
            ) : (
              <p className="text-4xl font-bold mt-1">
                {communityLoading ? (
                  <LoadingSpinner size="small" />
                ) : (
                  typeof value === 'number' ? value.toLocaleString() : value || 0
                )}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    );
};

  const renderCommunityStats = () => {
    if (communityError && (!communityStats || Object.keys(communityStats).length === 0)) {
      return renderCommunityErrorState();
    }

    return (
      <motion.div 
        className="max-w-7xl mx-auto p-4 md:p-6 space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {communityError && communityStats && Object.keys(communityStats).length > 0 && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="p-4 rounded-lg bg-red-50 border border-red-100 flex items-start gap-3">
              <AlertCircle className="text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-800">{communityError}</p>
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
          {lastUpdated && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 shadow-xs">
              <Clock size={16} style={{ color: colors.mainGreen }} />
              <span className="text-sm" style={{ color: colors.mainGreen }}>
                Updated: {lastUpdated.toLocaleTimeString()}
              </span>
            </div>
          )}
        </header>


      
      </motion.div>
    );
  };

  // Fitness stat cards
  const statCards = [
    { title: "Total Users", value: stats.users, icon: Users, bg: "bg-gradient-to-br from-[#27a1aa] to-[#0E7490] text-white" },
    { title: "Admins", value: stats.admins, icon: Award, bg: "bg-white text-black" },
    { title: "Exercises", value: stats.exercises, icon: Dumbbell, bg: "bg-white text-black" },
    { title: "Completed Sessions", value: stats.completedSessions, icon: CheckCircle, bg: "bg-white" },
  ];

  return (
    <div className="min-h-screen">
      <header className="text-white">
        <h1 className="text-3xl text-black font-bold">Fitness Dashboard</h1>
        <p className="text-[#497174] mt-2">Track platform performance and engagement</p>
      </header>

      <main className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-col gap-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {loading ? (
            Array(4).fill().map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg h-32 animate-pulse"></div>
            ))
          ) : (
            statCards.map((stat, i) => (
              <div key={i} className={`${stat.bg} rounded-xl shadow-lg py-3 flex items-center mr-3`}>
                <div className="flex items-center justify-center ml-8">
                  <stat.icon className="h-12 w-8" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium mb-4">{stat.title}</h3>
                    <p className="text-4xl font-bold mt-1">{stat.value.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Main Content Area */}
        <div className="space-y-8">
          <div className='w-full flex flex-row flex-2 gap-3 h-[20%]'>
            {/* Overview Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 h-[80%] w-[40%]">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4">User Progress Overview</h2>
              <div className="h-[300px] w-full overflow-hidden">
                <AllUsersProgressChart />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 w-[45%]">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4">Last Challenge</h2>
              <Leaderboard items={lastLeaderboard} type="last" className='h-[20%]' />
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 w-[40%]">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4">Gender Distribution</h2>
              <div className="h-[250px]">
                <GenderPieChart genderData={{ males: stats.males, females: stats.females }} />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Charts Section */}
        <div className="flex flex- gap-3 w-full my-8">
          <div className="bg-white rounded-xl shadow-lg w-full   min-h-[400px] overflow-hidden border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-[#0F172A] mb-4">Age Distribution</h2>
            <div className="h-[90%]">
              <UserAgeRunwayChart />
            </div>
          </div>
           <motion.div 

          className="flex flex-col gap-3 w-[60%]"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {renderStatCard('Total Posts', communityStats?.totalPosts, <BarChart2 size={30}  />,  0)}
          {renderStatCard('Active Users', communityStats?.totalUsers, <Users size={30}/>,  1)}
          {renderStatCard('Total Likes', communityStats?.totalLikes, <Heart size={30} />, 2)}
          {renderStatCard('Engagement', communityStats?.totalEngagement, <TrendingUp size={30} />, 3)}
           </motion.div>

            
        
        

        </div>

        {/* Leaderboards Section */}
        <div className="flex flex-col-2 gap-3">
          <div className="bg-white rounded-xl  w-[60%] shadow-lg border border-gray-100 p-4 md:col-span-2">
             <h2 className="text-xl font-bold text-[#0F172A] mb-2">Top Users</h2>
             <Leaderboard items={topUsers} type="top" />
           </div>
            <motion.section className="space-y-6 w-[40%]" variants={cardVariants}>
             {/* Header */}
             <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="p-3 rounded-lg shadow-xs" style={{ background: colors.gradientYellow }}>
                    <AwardIcon className="text-black" size={20} />
                </div>
                <h3 className="text-xl font-bold" style={{ color: colors.blueDark }}>Top Performers</h3>
             </div>
  
             {/* Cards Grid */}
              <div className="grid grid-cols-1  gap-4">
              {/* Most Liked Post */}
               <motion.div 
                className="rounded-xl p-4 shadow-sm border bg-white flex flex-col "
                variants={cardVariants}
               >
                 <div className="flex items-center gap-3 mb-4">
                     <div className="p-2 rounded-full shadow-xs" >
                       <Heart className="text-red-500" size={18} />
                     </div>
                     <h4 className="font-bold text-md" >Most Liked Post</h4>
                  </div>
                   {communityLoading ? (
                  <div className="flex justify-center items-center text-xs flex-grow">
                     <LoadingSpinner size="medium" />
                   </div>
      ) : communityStats?.mostLikedPost ? (
        renderPostInfo(communityStats.mostLikedPost)
      ) : (
        <div className="py-8 text-center rounded-lg flex-grow flex flex-col items-center justify-center gap-2" style={{ backgroundColor: colors.grayLight }}>
          <FileText className="text-gray-400" size={24} />
          <p className="text-gray-500 text-sm">No post data available</p>
        </div>
      )}
               </motion.div>

               {/* Most Shared Post */}
              <motion.div 
      className="rounded-xl p-4 shadow-sm border bg-white flex flex-col h-full"
      style={{ borderColor: colors.mainBlue }}
      variants={cardVariants}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-full shadow-xs" style={{ backgroundColor: colors.blueLight }}>
          <Repeat className="text-blue-500" size={18} />
        </div>
        <h4 className="font-bold text-md" style={{ color: colors.blueDark }}>Most Shared Post</h4>
      </div>
      {communityLoading ? (
        <div className="flex justify-center items-center py-10 flex-grow">
          <LoadingSpinner size="medium" />
        </div>
      ) : communityStats?.mostSharedPost ? (
        renderPostInfo(communityStats.mostSharedPost)
      ) : (
        <div className="py-8 text-center rounded-lg flex-grow flex flex-col items-center justify-center gap-2" style={{ backgroundColor: colors.grayLight }}>
          <Share2 className="text-gray-400" size={24} />
          <p className="text-gray-500 text-sm">No post data available</p>
        </div>
      )}
               </motion.div>

              </div>
          </motion.section>
          

              
        
        </div>

        <UserGrowthChart />

      </main>
    </div>
  );
};

export default Home;