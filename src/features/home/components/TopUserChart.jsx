import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopUsersChart = ({ users }) => {
   console.log(users)
  
  const data = {
    labels: users.map(user => user.name),
    datasets: [
      {
        label: 'Points',
        data: users.map(user => user.points),
        backgroundColor: [
          '#14919B', // Main blue
          '#0E7C86', // Darker blue
          '#ECF87E', // Yellow
          '#f3da88', // Darker yellow
          '#d6e852', // Green
          '#0a85e9', // Dark blue
          '#F5F9D5', // Light yellow
          '#078690', // Light blue
          '#0eb61680', // Blue with opacity
          '#72e0f680' // Yellow with opacity
        ],
        borderColor: [
          '#0F172A', // Dark border
          '#0F172A',
          '#0F172A',
          '#0F172A',
          '#0F172A',
          '#0F172A',
          '#0F172A',
          '#0F172A',
          '#0F172A',
          '#0F172A'
        ],
        borderWidth: 1,
        borderRadius: 4,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Add this to control aspect ratio manually
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const user = users[context.dataIndex];
            return `${user.name}: ${user.points} points`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#E2E8F0'
        },
        ticks: {
          color: '#64748B'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#0F172A'
        },
        // Add these properties to reduce padding and empty space
        afterFit: function(scale) {
          scale.width = scale.width * 0.9; // Reduce width by 10%
        },
        offset: true // Add some offset to prevent labels from being cut off
      }
    },
    // Adjust layout padding to reduce empty space
    layout: {
      padding: {
        right: 10 // Reduce right padding
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#0F172A]">Top Users by Points</h2>
        <div className="flex items-center px-3 py-1 rounded-full bg-[#ECF87E] text-[#0F172A] text-xs font-bold">
          Top 10
        </div>
      </div>
      
      <div className="h-60 w-full">
        <Bar 
          data={data} 
          options={options}
          // Add these props to make the chart fill the container
          width={null}
          height={null}
        />
      </div>
    </div>
  );
};

export default TopUsersChart;