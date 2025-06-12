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
  const [topUsers, setTopUsers] = useState(null);
  const [lastLeaderboard, setLastLeaderboard] = useState(null);

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

    const fetchTopTen = async () =>{
      const res = await axios.get("/users/top-users");
      const data = res.data.data;
      setTopUsers(data);
    }

    const fetchLastLeaderboard  = async () => {
      const res = await axios.get("/challenge-progress/leaderboard/last-session");
      const data = res.data.data;
      setLastLeaderboard(data);
    }

    fetchStats();
    fetchTopTen();
    fetchLastLeaderboard();

  }, [])

 const stats = {
  users,
  admins,
  exercises,
  completedSessions
 }
 

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