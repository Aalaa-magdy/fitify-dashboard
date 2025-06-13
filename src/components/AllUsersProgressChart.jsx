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
import LoadingSpinner from "./LoadingSpinner";

const AllUsersProgressChart = () => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [calcMethod, setCalcMethod] = useState("reps"); // 'reps' or 'time'

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/progress/all`);
        if (data.success && data.progress) {
          setProgressData(data.progress);
        }
      } catch (err) {
        console.error("Error fetching all users progress:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = useMemo(() => {
    const exerciseMap = {};

    progressData.forEach(item => {
      const name = item.exerciseId?.name;
      if (!name) return;

      if (!exerciseMap[name]) {
        exerciseMap[name] = {
          exercise: name,
          correctReps: 0,
          incorrectReps: 0,
          isTimeBased: item.calcMethod === 'time',
          timeInSeconds: 0
        };
      }

      if (item.calcMethod === 'time') {
        exerciseMap[name].timeInSeconds += item.timeInSeconds || 0;
      } else {
        exerciseMap[name].correctReps += item.correctReps || 0;
        exerciseMap[name].incorrectReps += item.incorrectReps || 0;
      }
    });

    return Object.values(exerciseMap).map(item => ({
      ...item,
      totalReps: item.correctReps + item.incorrectReps,
      accuracy: item.totalReps > 0 ? 
        Math.round((item.correctReps / item.totalReps) * 100) : 0
    }));
  }, [progressData]);

  const filteredData = useMemo(() => {
    return chartData.filter(item =>
      calcMethod === 'time' ? item.isTimeBased : !item.isTimeBased
    ).sort((a, b) => b.totalReps - a.totalReps);
  }, [chartData, calcMethod]);

  const colors = {
    correct: '#14919B',  // Teal for correct reps
    incorrect: '#cddc44', // Yellow for incorrect reps
    time: '#0F172A'      // Dark for time-based
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <div className="bg-white p-4 border border-gray-200 rounded shadow-md">
          <p className="font-semibold">{label}</p>
          {calcMethod === 'time' ? (
            <p>Total Time: {data.timeInSeconds} seconds</p>
          ) : (
            <>
              <p>Correct Reps: {data.correctReps}</p>
              <p>Incorrect Reps: {data.incorrectReps}</p>
              <p>Total Reps: {data.totalReps}</p>
              <p className="font-medium mt-1">
                Accuracy: <span className="text-blue-600">{data.accuracy}%</span>
              </p>
            </>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[15px] ">Exercise Performance</h2>
        <select
          value={calcMethod}
          onChange={(e) => setCalcMethod(e.target.value)}
          className="text-sm p-1 border rounded"
        >
          <option value="reps">Rep-based Exercises</option>
          <option value="time">Time-based Exercises</option>
        </select>
      </div>

      {loading ? (
        <LoadingSpinner/>
      ) : filteredData.length === 0 ? (
        <div className="text-center text-gray-500 text-sm">
          No {calcMethod === 'time' ? 'time-based' : 'rep-based'} exercises found.
        </div>
      ) : (
        <div className="w-full h-[300px]"> {/* Fixed height container */}
          <ResponsiveContainer width="100%" height="100%">
            {calcMethod === 'time' ? (
              <BarChart
                data={filteredData}
                margin={{ top: 20, right: 20, left: 20, bottom: 60 }}
                layout="vertical"
                barSize={20}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" />
                <YAxis 
                  dataKey="exercise" 
                  type="category" 
                  width={100}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  dataKey="timeInSeconds" 
                  name="Time (seconds)" 
                  fill={colors.time}
                  radius={[0, 4, 4, 0]}
                >
                  {filteredData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors.time} />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <BarChart
                data={filteredData}
                margin={{ top: 20, right: 20, left: 20, bottom: 60 }}
                barGap={2}
              >
                <CartesianGrid strokeDasharray="2 2" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="exercise" 
                  angle={-45} 
                  textAnchor="end" 
                  height={70}
                  tick={{ fontSize: 10 }}
                  interval={0}
                />
                <YAxis 
                  label={{
                    value: 'Repetitions',
                    angle: -90,
                    position: 'insideLeft',
                    fontSize: 12
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  dataKey="correctReps" 
                  name="Correct Reps" 
                  fill={colors.correct}
                  barSize={20}
                  radius={[4, 4, 0, 0]}
                >
                  {filteredData.map((entry, index) => (
                    <Cell key={`cell-correct-${index}`} fill={colors.correct} />
                  ))}
                </Bar>
                <Bar 
                  dataKey="incorrectReps" 
                  name="Incorrect Reps" 
                  fill={colors.incorrect}
                  barSize={20}
                  radius={[4, 4, 0, 0]}
                >
                  {filteredData.map((entry, index) => (
                    <Cell key={`cell-incorrect-${index}`} fill={colors.incorrect} />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default AllUsersProgressChart;