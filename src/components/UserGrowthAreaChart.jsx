import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "../api/axiosInstance";

const UserGrowthAreaChart = () => {
  const [growthData, setGrowthData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGrowth = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/stats/user-growth");
      if (data.success) {
        setGrowthData(data.data.filter((d) => d.month));
      }
    } catch (err) {
      console.error("Error fetching user growth data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrowth();
  }, []);

  const formatMonth = (monthStr) => {
    if (!monthStr || monthStr === "Unknown") return "Unknown";
    const [year, month] = monthStr.split("-");
    return `${month}/${year.slice(2)}`; // e.g., 03/25
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-3xl">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        User Growth Over Time
      </h2>

      {loading ? (
        <div className="text-gray-400 text-sm">Loading...</div>
      ) : growthData.length === 0 ? (
        <div className="text-gray-400 text-sm">No data available.</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={growthData}
            margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
          >
            <defs>
              <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14919B" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#14919B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickFormatter={formatMonth}
              fontSize={12}
              angle={-30}
              textAnchor="end"
              interval={0}
            />
            <YAxis fontSize={12} allowDecimals={false} />
            <Tooltip formatter={(val) => [val, "Users"]} labelFormatter={formatMonth} />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#14919B"
              fillOpacity={1}
              fill="url(#colorGrowth)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default UserGrowthAreaChart;
