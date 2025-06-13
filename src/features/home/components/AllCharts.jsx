import GenderPieChart from "../../../components/GenderPieChart";
import UserAgeRunwayChart from "../../../components/UserAgeRunwayChart";
import AllUsersProgressChart from "../../../components/AllUsersProgressChart";
import Leaderboard from "../../../components/Leaderboard";

const AllCharts = ({  lastLeaderboard }) => {
  return (
    
      <div className='w-full flex flex-raw lg:flex-row gap-6'>
      
        <div className='flex flex-col w-[50%] gap-3'>
         <div className="bg-white h-[340px] rounded-xl shadow-lg border border-gray-100 p-6">
           <h2 className="text-xl font-bold text-[#0F172A] mb-4">Last Challenge</h2>
           <Leaderboard items={lastLeaderboard} type="last" />
         </div>
           <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 ">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4">User Progress Overview</h2>
              <div className="h-[300px] w-full overflow-hidden">
                <AllUsersProgressChart />
              </div>
          </div> 
          </div>

         <div className="bg-white rounded-xl shadow-lg w-[50%] h-[500px] overflow-hidden border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-[#0F172A] mb-4">Age Distribution</h2>
          <UserAgeRunwayChart />
        </div>

         
    </div>
  );
};

export default AllCharts;