import { useEffect, useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts";
import axios from "../api/axiosInstance";
import LoadingSpinner from './LoadingSpinner';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const aggregateByDate = (data) => {
  const map = {};

  data.forEach((item) => {
    if (!item.createdAt) return;

    const date = formatDate(item.createdAt);
    if (!map[date]) {
      map[date] = { 
        date, 
        correct: 0, 
        incorrect: 0,
        total: 0,
        accuracy: 0 
      };
    }

    if (item.calcMethod === "time" && item.timeInSeconds != null) {
      map[date].correct += item.timeInSeconds;
      map[date].total += item.timeInSeconds;
    } else {
      map[date].correct += item.correctReps || 0;
      map[date].incorrect += item.incorrectReps || 0;
      map[date].total += (item.correctReps || 0) + (item.incorrectReps || 0);
    }

    // Calculate accuracy percentage
    if (map[date].total > 0) {
      map[date].accuracy = Math.round((map[date].correct / map[date].total) * 100);
    }
  });

  return Object.values(map);
};

const BarChartProgress = ({ user }) => {
  const [progressData, setProgressData] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/progress/user/${user?._id}`);
        if (data.success && data.progress) {
          setProgressData(data.progress);
        }
      } catch (err) {
        console.error("Error fetching user progress:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchData();
    }
  }, [user]);

  const exercises = useMemo(() => {
    const names = new Set(
      progressData.map((item) => item.exerciseId?.name).filter(Boolean)
    );
    return ["All", ...Array.from(names)];
  }, [progressData]);

  const chartData = useMemo(() => {
    const filtered =
      selectedExercise === "All"
        ? progressData
        : progressData.filter(
            (item) =>
              item.exerciseId?.name?.trim().toLowerCase() ===
              selectedExercise.trim().toLowerCase()
          );
    return aggregateByDate(filtered);
  }, [progressData, selectedExercise]);

  const isTimeBased = useMemo(() => {
    if (selectedExercise === "All") return false;
    const matched = progressData.find(
      (item) =>
        item.exerciseId?.name?.trim().toLowerCase() ===
        selectedExercise.trim().toLowerCase()
    );
    return matched?.calcMethod === "time";
  }, [progressData, selectedExercise]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-md">
          <p className="font-bold text-gray-800 mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#14919B] mr-2"></div>
              <span className="text-gray-700">
                {isTimeBased ? "Time:" : "Correct:"} <span className="font-semibold">{payload[0].value}</span>
              </span>
            </div>
            {!isTimeBased && (
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#E2F163] mr-2"></div>
                <span className="text-gray-700">
                  Incorrect: <span className="font-semibold">{payload[1]?.value || 0}</span>
                </span>
              </div>
            )}
            {!isTimeBased && (
              <div className="pt-2 mt-2 border-t border-gray-100">
                <span className="text-gray-700">
                  Accuracy: <span className="font-semibold">{payload[0].payload.accuracy}%</span>
                </span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Progress Overview</h2>
        <div className="flex items-center gap-3">
          <select
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#14919B] focus:border-transparent"
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
          >
            {exercises.map((ex, idx) => (
              <option key={idx} value={ex}>
                {ex}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
       <LoadingSpinner />
      ) : chartData.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-gray-500">
          No data available for selected exercise.
        </div>
      ) : (
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barGap={0}
              barCategoryGap={10} // Reduced from 20 to 10
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#6b7280' }}
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                tick={{ fill: '#6b7280' }}
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="top" 
                height={50}
                iconType="circle"
                iconSize={10}
                formatter={(value) => (
                  <span className="text-gray-600 text-sm">{value}</span>
                )}
              />
              
              <Bar
                dataKey="correct"
                name={isTimeBased ? "Time (seconds)" : "Correct Reps"}
                fill="#14919B"
                radius={[4, 4, 0, 0]}
                barSize={20} // Explicitly set smaller bar size
              >
                {chartData.map((entry, index) => (
                  <Cell key={`correct-${index}`} fill="#14919B" />
                ))}
              </Bar>
              
              {!isTimeBased && (
                <Bar
                  dataKey="incorrect"
                  name="Incorrect Reps"
                  fill="#E2F163"
                  radius={[4, 4, 0, 0]}
                  barSize={20} // Explicitly set smaller bar size
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`incorrect-${index}`} fill="#E2F163" />
                  ))}
                </Bar>
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default BarChartProgress;