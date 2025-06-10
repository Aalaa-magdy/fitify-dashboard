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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

const aggregateByDate = (data) => {
  const map = {};

  data.forEach((item) => {
    if (!item.createdAt) return;

    const date = formatDate(item.createdAt);
    if (!map[date]) {
      map[date] = { date, correct: 0, incorrect: 0 };
    }

    if (item.calcMethod === "time" && item.timeInSeconds != null) {
      map[date].correct += item.timeInSeconds;
    } else {
      map[date].correct += item.correctReps || 0;
      map[date].incorrect += item.incorrectReps || 0;
    }
  });

  return Object.values(map);
};

const UserProgressChart = ({ user }) => {
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

  return (
    <div className="bg-white p-6 rounded-2xl shadow w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">User Progress</h2>
        <select
          className="border rounded-md px-2 py-1 text-sm"
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

      {loading ? (
        <div className="text-center text-gray-500">Loading chart data...</div>
      ) : chartData.length === 0 ? (
        <div className="text-center text-gray-500">No data available.</div>
      ) : (
       <ResponsiveContainer width="100%" height={300}>
  <LineChart data={chartData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Legend />

    <Line
      type="linear" 
      dataKey="correct"
      stroke="#14919B"
      strokeWidth={2}
      name={isTimeBased ? "Time (sec)" : "Correct Reps"}
      dot={{ r: 4, stroke: "#14919B", strokeWidth: 2, fill: "#fff" }}
      activeDot={{ r: 6 }}
    />

    {!isTimeBased && (
      <Line
        type="linear"
        dataKey="incorrect"
        stroke="#E2F163"
        strokeWidth={2}
        name="Incorrect Reps"
        dot={{ r: 4, stroke: "#E2F163", strokeWidth: 2, fill: "#fff" }}
        activeDot={{ r: 6 }}
      />
    )}
  </LineChart>
</ResponsiveContainer>

      )}
    </div>
  );
};

export default UserProgressChart;
