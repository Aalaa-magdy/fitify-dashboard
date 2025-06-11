import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  CartesianGrid, LabelList, Cell, Legend
} from 'recharts';
import axios from '../api/axiosInstance';
import LoadingSpinner from './LoadingSpinner';

const UserAgeRunwayChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);

  // Updated color palette - blue, green, yellow
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#3B82F6', '#10B981'];
  
  useEffect(() => {
    const fetchAgeStats = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/stats/ages');
        const total = res.data.reduce((sum, item) => sum + item.count, 0);
        setTotalUsers(total);
        setData(res.data);
      } catch (err) {
        setError('Failed to load age distribution data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAgeStats();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="text-center text-gray-500 py-20">
          {error}
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Calculate percentage for label formatter
  const getPercentage = (value) => {
    return Math.round((value / totalUsers) * 100);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">User Age Distribution</h2>
        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">
            Total Users: {totalUsers}
          </span>
        </div>
      </div>
      
      <div className="h-40 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
            barSize={18}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
            <XAxis 
              type="number" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickFormatter={(value) => `${value}`}
            />
            <YAxis 
              dataKey="range" 
              type="category" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#374151' }}
              width={80}
            />
            <Tooltip 
              content={<CustomTooltip totalUsers={totalUsers} />}
              cursor={{ fill: '#EFF6FF' }}
            />
            
            <Bar 
              dataKey="count" 
              name="Users"
              radius={[0, 4, 4, 0]}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                />
              ))}
              <LabelList 
                dataKey="count" 
                position="right" 
                formatter={(value) => `${value} (${getPercentage(value)}%)`}
                style={{ fontSize: 12, fill: '#6B7280' }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label, totalUsers }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const percentage = Math.round((data.count / totalUsers) * 100);
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
        <p className="font-medium text-gray-800">{data.range}</p>
        <div className="flex items-center mt-1">
          <span 
            className="inline-block w-3 h-3 rounded-full mr-2" 
            style={{ backgroundColor: payload[0].color }}
          />
          <p className="text-sm">
            Users: <span className="font-semibold ml-1">{data.count}</span>
          </p>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {percentage}% of total
        </p>
      </div>
    );
  }
  return null;
};


export default UserAgeRunwayChart;