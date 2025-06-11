import { useEffect, useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import axios from "../api/axiosInstance";

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

      const isTimeBased = item.calcMethod === 'time';

      if (!exerciseMap[name]) {
        exerciseMap[name] = {
          exercise: name,
          correctTime: 0,
          correctReps: 0,
          incorrectReps: 0,
          isTimeBased,
        };
      }

      if (isTimeBased) {
        exerciseMap[name].correctTime += item.timeInSeconds || 0;
      } else {
        exerciseMap[name].correctReps += item.correctReps || 0;
        exerciseMap[name].incorrectReps += item.incorrectReps || 0;
      }
    });

    return Object.values(exerciseMap).map(item => {
      if (item.isTimeBased) {
        return {
          exercise: item.exercise,
          correctTime: item.correctTime,
          isTimeBased: true
        };
      } else {
        const totalReps = item.correctReps + item.incorrectReps;
        const percentage = totalReps === 0 ? 0 : (item.correctReps / totalReps) * 100;
        return {
          exercise: item.exercise,
          correctPercentage: Number(percentage.toFixed(1)), // keep 1 decimal
          isTimeBased: false
        };
      }
    });
  }, [progressData]);

  const filteredData = useMemo(() => {
    return chartData.filter(item =>
      calcMethod === 'time' ? item.isTimeBased : !item.isTimeBased
    );
  }, [chartData, calcMethod]);

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-md font-semibold">Exercise Summary</h2>
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
        <div className="text-center text-gray-500 text-sm">Loading...</div>
      ) : filteredData.length === 0 ? (
        <div className="text-center text-gray-500 text-sm">
          No {calcMethod === 'time' ? 'time-based' : 'rep-based'} exercises found.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filteredData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="2 2" stroke="#f0f0f0" />
            <XAxis 
              dataKey="exercise" 
              tick={{ fontSize: 12 }}
              height={30}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              width={60}
              label={{
                value: calcMethod === 'time' ? 'Seconds' : 'Correct %',
                angle: -90,
                position: 'insideLeft',
                fontSize: 12
              }}
              domain={calcMethod === 'reps' ? [0, 100] : ['auto', 'auto']}
            />
            <Tooltip 
              formatter={(value) => [
                `${value} ${calcMethod === 'time' ? 'sec' : '%'}`,
                calcMethod === 'time' ? 'Correct Time' : 'Correct %'
              ]}
              labelFormatter={(label) => `Exercise: ${label}`}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            <Line
              type="monotone"
              dataKey={calcMethod === 'time' ? "correctTime" : "correctPercentage"}
              stroke="#4CAF50"
              name={calcMethod === 'time' ? "Correct Time (sec)" : "Correct %"}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default AllUsersProgressChart;
