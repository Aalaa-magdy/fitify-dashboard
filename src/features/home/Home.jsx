import { useState, useEffect } from "react";
import axios from "../../api/axiosInstance.js";
import LoadingSpinner from '../../components/LoadingSpinner';
import FitnessStats from "./components/FitnessStats";
import AllCharts from "./components/AllCharts";
import TopUsersChart from "./components/TopUserChart";
import GenderPieChart from "../../components/GenderPieChart";
import SocialEngagementCards from "./components/SocialEngagementCard";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [fitnessData, setFitnessData] = useState({
    stats: null,
    topUsers: null,
    lastLeaderboard: null
  });
  const [communityData, setCommunityData] = useState({
    stats: null,
    loading: true,
    error: null,
    lastUpdated: null,
    retryCount: 0
  });

  // Fetch fitness data
  useEffect(() => {
    const fetchFitnessData = async () => {
      try {
        const [statsRes, topUsersRes, leaderboardRes] = await Promise.all([
          axios.get("/stats"),
          axios.get("/users/top-users"),
          axios.get("/challenge-progress/leaderboard/last-session"),
        ]);
        console.log("leader",topUsersRes)
        setFitnessData({
          stats: statsRes.data,
          topUsers: topUsersRes.data.data,
          lastLeaderboard: leaderboardRes.data.data
        });
      } catch (error) {
        console.error("Error fetching fitness data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFitnessData();
  }, []);

  // Fetch community data
  const fetchCommunityData = async () => {
    try {
      setCommunityData(prev => ({
        ...prev,
        loading: true,
        error: null
      }));
      
      const response = await axios.get('/stats/community');
      
      setCommunityData(prev => ({
        ...prev,
        stats: response.data,
        lastUpdated: new Date(),
        retryCount: 0,
        loading: false
      }));
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
      
      setCommunityData(prev => ({
        ...prev,
        retryCount: prev.retryCount + 1,
        loading: false
      }));
    }
  };

  useEffect(() => {
    fetchCommunityData();
    const intervalId = setInterval(fetchCommunityData, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  

  return (
    <div className="min-h-screen">
      <header className="text-white ">
        <h1 className="text-3xl text-black font-bold">Fitness Dashboard</h1>
        <p className="text-[#497174] mt-2">Track platform performance and engagement</p>
      </header>

      <main className="  space-y-8 flex flex-col ">
        {/* Fitness Statistics */}
        
        <FitnessStats stats={fitnessData.stats} loading={loading} />
        
        <div className='flex flex-row gap-3 w-full h-[350px] '>
          <div className="lg:w-[40%] ">
              <TopUsersChart users={fitnessData.topUsers} />
          </div>

           
          <div className="bg-white h-[342px] p-4 rounded-xl shadow-lg border border-gray-100 ">
              <h2 className="text-xl  font-bold text-[#0F172A] mb-4">Gender Distribution</h2>
              <GenderPieChart genderData={{ males: fitnessData.stats?.males, females: fitnessData.stats?.females }} />
          </div>
        <div className='w-[30%]'>
               <SocialEngagementCards  />
          </div>
        </div>
        
        {/* Charts Section */}
        <AllCharts 
          stats={fitnessData.stats} 
          lastLeaderboard={fitnessData.lastLeaderboard} 
        />
        

      </main>
    </div>
  );
};

export default Home;