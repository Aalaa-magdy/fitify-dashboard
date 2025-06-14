import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  Label,
  Legend
} from "recharts";
import axios from "../api/axiosInstance";
import LoadingSpinner from './LoadingSpinner';

const ExerciseTimeChart = () => {
  const [activityData, setActivityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalExercises, setTotalExercises] = useState(0);
  const [activeHour, setActiveHour] = useState(null);
  const [timeRange, setTimeRange] = useState('all'); // 'morning', 'afternoon', 'evening', 'night', 'all'

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/stats/exercise-time`);
        if (data.success) {
          const total = data.data.reduce((sum, item) => sum + item.count, 0);
          setTotalExercises(total);

          const fullData = Array.from({ length: 24 }, (_, hour) => {
            const existing = data.data.find(item => item.hour === hour);
            const count = existing ? existing.count : 0;
            const percentage = total > 0 ? (count / total) * 100 : 0;
            return { 
              hour, 
              count,
              percentage: parseFloat(percentage.toFixed(1)),
              timeCategory: getTimeCategory(hour)
            };
          });
          setActivityData(fullData);
        }
      } catch (err) {
        console.error("Error fetching activity data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getTimeCategory = (hour) => {
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  };

  const filteredData = timeRange === 'all' 
    ? activityData 
    : activityData.filter(item => item.timeCategory === timeRange);

  const formatHour = (hour) => {
    return hour === 0 ? '12 AM' : 
           hour < 12 ? `${hour} AM` : 
           hour === 12 ? '12 PM' : 
           `${hour - 12} PM`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg text-sm backdrop-blur-sm bg-opacity-90">
          <p className="font-semibold text-gray-800">{formatHour(label)}</p>
          <div className="flex items-center mt-1">
            <span className="inline-block w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: getBarColor(data.percentage) }} />
            <p>Percentage: <span className="font-bold text-gray-900">{data.percentage}%</span></p>
          </div>
          <p>Exercises: <span className="font-bold text-gray-900">{data.count}</span></p>
          <p className="text-xs text-gray-500 mt-1">
            {totalExercises > 0 ? `of ${totalExercises} total exercises` : ''}
          </p>
        </div>
      );
    }
    return null;
  };

  const getBarColor = (percentage) => {
    if (percentage === 0) return '#e5e7eb';
    if (percentage <= 10) return '#8BD3DD';
    if (percentage <= 20) return '#5BB5C5';
    if (percentage <= 30) return '#14919B';
    return '#0C6470';
  };

  const timeRangeLabels = {
    all: 'All Day',
    morning: 'Morning (5AM-12PM)',
    afternoon: 'Afternoon (12PM-5PM)',
    evening: 'Evening (5PM-9PM)',
    night: 'Night (9PM-5AM)'
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-4xl mx-auto border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">
            Exercise Activity Distribution by Time of Day
          </h2>
          {totalExercises > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              Showing {timeRangeLabels[timeRange]} • {totalExercises} total exercises
            </p>
          )}
        </div>
        
        <div className="mt-4 md:mt-0">
          <div className="flex flex-wrap gap-2">
            {Object.keys(timeRangeLabels).map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  timeRange === range 
                    ? 'bg-secondYellow text-gray-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {timeRangeLabels[range]}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="h-80 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : activityData.length === 0 ? (
        <div className="h-80 flex items-center justify-center text-gray-500 bg-gray-50 rounded-xl">
          No activity data available.
        </div>
      ) : (
        <div className="h-80 relative">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredData}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              barSize={20}
              barCategoryGap={2}
              onMouseLeave={() => setActiveHour(null)}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis 
                dataKey="hour" 
                tickFormatter={formatHour}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
                interval={timeRange === 'all' ? 3 : 0}
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
                tickFormatter={(value) => `${value}%`}
              >
                <Label 
                  value="Percentage of exercises" 
                  angle={-90} 
                  position="insideLeft" 
                  style={{ textAnchor: 'middle', fontSize: 12, fill: '#6b7280' }}
                />
              </YAxis>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                content={() => (
                  <div className="flex justify-center mt-4">
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-e5e7eb mr-1" />
                        <span>0%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-8BD3DD mr-1" />
                        <span>1-10%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-5BB5C5 mr-1" />
                        <span>11-20%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-14919B mr-1" />
                        <span>21-30%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-0C6470 mr-1" />
                        <span>30%+</span>
                      </div>
                    </div>
                  </div>
                )}
              />
              
              <Bar
                dataKey="percentage"
                name="Percentage"
                radius={[4, 4, 0, 0]}
                onMouseOver={(data) => setActiveHour(data.hour)}
              >
                {filteredData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={getBarColor(entry.percentage)} 
                    stroke={entry.percentage > 0 ? '#0C6470' : 'transparent'}
                    strokeWidth={activeHour === entry.hour ? 2 : 0}
                    opacity={activeHour === null || activeHour === entry.hour ? 1 : 0.7}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          
          {timeRange !== 'all' && filteredData.length > 0 && (
            <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-2 rounded-lg shadow-sm text-sm">
              <p className="font-medium text-gray-700">
                {timeRangeLabels[timeRange]}
              </p>
              <p className="text-gray-600">
                {filteredData.reduce((sum, item) => sum + item.count, 0)} exercises
              </p>
              <p className="text-gray-600">
                {(
                  filteredData.reduce((sum, item) => sum + item.count, 0) / 
                  totalExercises * 100
                ).toFixed(1)}% of total
              </p>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>Hover over bars to see detailed information</p>
      </div>
    </div>
  );
};

export default ExerciseTimeChart;