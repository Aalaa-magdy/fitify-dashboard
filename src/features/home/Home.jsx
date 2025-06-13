import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import Leaderboard from "../../components/Leaderboard";
import GenderPieChart from "../../components/GenderPieChart";
import UserAgeRunwayChart from "../../components/UserAgeRunwayChart";
import AllUsersProgressChart from "../../components/AllUsersProgressChart";
import { Users, Dumbbell, CheckCircle, Award, TrendingUp, ChevronRight, Mail, Bell } from "lucide-react";
import CommunityStats from "../../components/CommunityStats";
const Home = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ users: 0, admins: 0, exercises: 0, completedSessions: 0, males: 0, females: 0 });
  const [topUsers, setTopUsers] = useState(null);
  const [lastLeaderboard, setLastLeaderboard] = useState(null);

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

  const statCards = [
    { title: "Total Users", value: stats.users, icon: Users, bg: "bg-gradient-to-br from-[#27a1aa] to-[#0E7490] text-white" },
    { title: "Admins", value: stats.admins, icon: Award, bg: "bg-white text-black" },
    { title: "Exercises", value: stats.exercises, icon: Dumbbell, bg: "bg-white text-black  " },
    { title: "Completed Sessions", value: stats.completedSessions, icon: CheckCircle, bg: "bg-white" },
  ];

  return (
    <div className="min-h-screen">

      


      <header className=" text-white ">
        <h1 className="text-3xl text-black font-bold">Fitness Dashboard</h1>
        <p className="text-[#497174] mt-2">Track platform ,performance and engagement</p>
      </header>

      <main className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-col  gap-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {loading ? (
            Array(4).fill().map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg h-32 animate-pulse"></div>
            ))
          ) : (
            statCards.map((stat, i) => (
              <div key={i} className={`${stat.bg} rounded-xl shadow-lg py-3  flex items-center mr-3`}>
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

        {/* Main Content Area - All Sections Visible */}
<div className="space-y-8">
  <div className='w-full flex flex-row flex-2 gap-3  h-[20%]'>
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

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 w-[40%] ">
           <h2 className="text-xl font-bold text-[#0F172A] mb-4">Gender Distribution</h2>
           <div className="h-[250px]">
              <GenderPieChart genderData={{ males: stats.males, females: stats.females }} />
            </div>
         </div>
    </div>
      
    </div>

  {/* Stats Charts Section */}
  <div className="grid gap-6 md:grid-cols-2">
  
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-[#0F172A] mb-4">Age Distribution</h2>
      <div className="h-[300px]">
        <UserAgeRunwayChart />
      </div>
    
  </div>

  {/* Leaderboards Section */}
  <div className="grid gap-6 md:grid-cols-3">
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:col-span-2">
      <h2 className="text-xl font-bold text-[#0F172A] mb-4">Top Users</h2>
      <Leaderboard items={topUsers} type="top" />
    </div>

    <CommunityStats/>
  
  </div>
</div>
      </main>
    </div>
  );
};

export default Home;