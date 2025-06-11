import { useEffect, useState } from "react";
import Leaderboard from "../../components/Leaderboard";
import axios from "../../api/axiosInstance";
import GenderPieChart from "../../components/GenderPieChart";
import UserAgeRunwayChart from "../../components/UserAgeRunwayChart"
import { StatsSection } from "../../components/StatsSection";
import AllUsersProgressChart from "../../components/AllUsersProgressChart";

const Home = () => {
  const [users,setUsers] = useState(0);
  const [admins, setAdmins] = useState(0);
  const [exercises, setExercises] = useState(0);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [genderData, setGenderData] = useState({males:0, females:0});
  useEffect(()=>{
    const fetchStats = async ()=> {
      const res = await axios.get("/stats");
      const data = res.data;
      setUsers(data.users);
      setAdmins(data.admins);
      setExercises(data.exercises);
      setCompletedSessions(data.completedSessions);
      setGenderData({males: data.males, females: data.females })
    }

    fetchStats();
  }, [])

 const stats = {
  users,
  admins,
  exercises,
  completedSessions
 }
  const topUsers = [
    { id: 1, name: 'Alex Johnson', points: 2450, progress: 92 },
    { id: 2, name: 'Sam Wilson', points: 1980, progress: 85 },
    { id: 3, name: 'Jordan Lee', points: 1750, progress: 78 },
    // ... (other top users)
  ];

  const lastLeaderboard = [
    { id: 101, name: 'Emma Stone', position: 1, change: 'up' },
    { id: 102, name: 'Chris Evans', position: 2, change: 'down' },
    { id: 103, name: 'Taylor Swift', position: 3, change: 'up' },
    { id: 104, name: 'John Doe', position: 4, change: 'new' },
    { id: 105, name: 'Jane Smith', position: 5, change: 'same' },
  ];

  // Color palette
  const colors = {
    mainBlue: '#3B82F6',
    secondYellow: '#F59E0B',
    emerald: '#10B981',
    red: '#EF4444',
    lightBlue: '#EFF6FF',
    slate: '#64748B',
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
     
      <StatsSection data={stats}/>

       <div className="flex flex-col md:flex-row gap-8 mt-20 mb-10">
          <GenderPieChart  genderData={genderData} />
          <UserAgeRunwayChart />
       </div>
       <div className="my-10">
          <AllUsersProgressChart />
       </div>

      {/* Main Content */}
     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  {/* Top 10 Users */}
  <div className="lg:col-span-2">
    <Leaderboard
      title="Top 10 Users"
      items={topUsers}
      type="top"
      colors={colors}
      onViewAll={() => console.log('View all users')}
    />
  </div>
  
  {/* Last Leaderboard */}
  <div>
    <Leaderboard
      title="Last Leaderboard"
      items={lastLeaderboard}
      type="last"
      colors={colors}
    />
  </div>
</div>
    </div>
  );
};


export default Home;