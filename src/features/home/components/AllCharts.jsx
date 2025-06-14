import UserAgeRunwayChart from "../../../components/UserAgeRunwayChart";
import AllUsersProgressChart from "../../../components/AllUsersProgressChart";
import Leaderboard from "../../../components/Leaderboard";
import ExerciseTimeChart from "../../../components/ExerciseTimeChart";
import UserGrowthAreaChart from "../../../components/UserGrowthAreaChart";

const AllCharts = ({  lastLeaderboard }) => {
  return (
    
      <div className='w-full flex flex-raw lg:flex-row gap-6'>
      
        <div className='flex flex-col w-[50%] gap-3'>
         <div className="bg-white h-fit rounded-xl shadow-lg border border-gray-100 p-6">
           <h2 className="text-xl font-bold text-[#0F172A] mb-4">Last Challenge</h2>
           <Leaderboard items={lastLeaderboard} type="last" />
         </div>
         <div className='flex flex-col gap-3'>
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 ">
                <h2 className="text-xl font-bold text-[#0F172A] mb-4">Users Progress Overview</h2>
                <div className="h-[300px] w-full overflow-hidden">
                   <AllUsersProgressChart />
                 </div>
              </div> 
              <UserGrowthAreaChart />
         </div>
          
          </div>
        <div className=' rounded-xl shadow-lg w-[50%] '>
         <div className="flex flex-col  gap-3 ">
          <UserAgeRunwayChart />
          <ExerciseTimeChart />
        </div>
  
       </div>
         
    </div>
  );
};

export default AllCharts;