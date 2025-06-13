import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  CartesianGrid, LabelList, Cell, Legend
} from 'recharts';
import axios from '../api/axiosInstance';
import LoadingSpinner from './LoadingSpinner';
import { FiRefreshCw, FiAlertCircle } from 'react-icons/fi';

// Matching the color palette from previous components
const COLORS = {
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

// Color sequence for bars
const BAR_COLORS = [
  COLORS.mainBlue, 
  COLORS.mainGreen, 
  COLORS.mainYellow, 
  COLORS.blueDark,
  COLORS.secondYellow
];

const UserAgeRunwayChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [retryCount, setRetryCount] = useState(0);

  const fetchAgeStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get('/stats/ages');
      const total = res.data.reduce((sum, item) => sum + item.count, 0);
      setTotalUsers(total);
      setData(res.data);
      setRetryCount(0);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to load age distribution data');
      setRetryCount(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAgeStats();
  }, []);

  const getPercentage = (value) => {
    return Math.round((value / totalUsers) * 100);
  };

  if (loading && retryCount === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-center items-center h-60">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="text-center py-10">
          <div className="mx-auto w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
            <FiAlertCircle className="text-red-500 text-xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">{error}</h3>
          <p className="text-sm text-gray-500 mb-4">
            {retryCount < 3 ? 'Please try again' : 'Please try again later'}
          </p>
          <button 
            onClick={fetchAgeStats}
            disabled={loading || retryCount >= 3}
            className={`px-4 py-2 text-sm rounded-lg flex items-center mx-auto space-x-2 ${
              loading ? 'bg-blue-100 text-blue-600' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            } transition-colors`}
          >
            {loading ? (
              <>
                <FiRefreshCw className="animate-spin" />
                <span>Retrying...</span>
              </>
            ) : (
              <>
                <FiRefreshCw />
                <span>Retry</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5">
        <div className="flex items-center space-x-3">
          <div 
            className="p-2 rounded-lg"
            style={{ background: COLORS.gradientBlue }}
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">User Age Distribution</h2>
        </div>
        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <span 
            className="text-xs px-3 py-1 rounded-full font-medium"
            style={{ 
              background: COLORS.yellowLight,
              color: COLORS.mainGreen
            }}
          >
            Total Users: {totalUsers.toLocaleString()}
          </span>
        </div>
      </div>
      
      <div className="h-60 sm:h-80 -mr-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            barSize={20}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              horizontal={false} 
              stroke="#E5E7EB" 
              strokeOpacity={0.7}
            />
            <XAxis 
              type="number" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#6B7280' }}
              tickFormatter={(value) => `${value}`}
            />
            <YAxis 
              dataKey="range" 
              type="category" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: COLORS.blueDark }}
              width={90}
            />
            <Tooltip 
              content={<CustomTooltip totalUsers={totalUsers} />}
              cursor={{ fill: COLORS.blueLight, fillOpacity: 0.5 }}
            />
            
            <Bar 
              dataKey="count" 
              name="Users"
              radius={[0, 4, 4, 0]}
              animationDuration={1200}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={BAR_COLORS[index % BAR_COLORS.length]} 
                />
              ))}
              <LabelList 
                dataKey="count" 
                position="right" 
                formatter={(value) => `${value} (${getPercentage(value)}%)`}
                style={{ 
                  fontSize: 11, 
                  fill: COLORS.blueDark,
                  fontWeight: 500
                }}
                offset={10}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center text-xs">
            <span 
              className="w-3 h-3 rounded-sm mr-1.5"
              style={{ backgroundColor: BAR_COLORS[index % BAR_COLORS.length] }}
            />
            <span className="text-gray-600">{item.range}:</span>
            <span className="font-medium ml-1 text-gray-800">
              {getPercentage(item.count)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label, totalUsers }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const percentage = Math.round((data.count / totalUsers) * 100);
    return (
      <div 
        className="bg-white p-3 shadow-lg rounded-lg border border-gray-200"
        style={{ minWidth: '160px' }}
      >
        <p className="font-medium text-gray-800 mb-1">{data.range}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span 
              className="inline-block w-2.5 h-2.5 rounded-sm mr-2" 
              style={{ backgroundColor: payload[0].color }}
            />
            <span className="text-sm text-gray-600">Users:</span>
          </div>
          <span className="font-semibold text-gray-800">{data.count.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-sm text-gray-600">Percentage:</span>
          <span className="font-semibold text-gray-800">{percentage}%</span>
        </div>
      </div>
    );
  }
  return null;
};

export default UserAgeRunwayChart;