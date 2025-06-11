import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GenderPieChart = ({ genderData }) => {
  // Updated color palette (blue, green, yellow)
  const colors = {
    male: '#3B82F6',      // Your existing blue
    female: '#10B981',    // Professional green (alternative: #059669)
    accent: '#F59E0B',    // Yellow for highlights (optional)
    background: '#F9FAFB',
    border: '#E5E7EB',
    textPrimary: '#111827',
    textSecondary: '#6B7280'
  };

  const data = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        data: [genderData.males, genderData.females],
        backgroundColor: [colors.male, colors.female],
        borderColor: '#fff',
        borderWidth: 1.5,
        hoverOffset: 8,
        hoverBorderColor: '#fff'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 16,
          font: {
            size: 12,
            family: 'Inter, sans-serif'
          },
          usePointStyle: true,
          pointStyle: 'circle',
          color: colors.textPrimary
        }
      },
      tooltip: {
        backgroundColor: colors.textPrimary,
        titleFont: { 
          size: 12,
          weight: 'bold',
          family: 'Inter, sans-serif'
        },
        bodyFont: { 
          size: 12,
          family: 'Inter, sans-serif'
        },
        padding: 10,
        displayColors: true,
        boxPadding: 4,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const value = context.raw;
            const percentage = Math.round((value / total) * 100);
            return ` ${context.label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '68%',
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  return (
    <div className="w-full  max-w-xs p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Gender Distribution</h3>
        <div className="flex space-x-2">
          <span className="text-xs px-2 py-1 rounded-md font-medium" 
                style={{ backgroundColor: '#EFF6FF', color: colors.male }}>
            {genderData.males} Male
          </span>
          <span className="text-xs px-2 py-1 rounded-md font-medium" 
                style={{ backgroundColor: '#ECFDF5', color: colors.female }}>
            {genderData.females} Female
          </span>
        </div>
      </div>
      <div className="h-60">
        <Pie data={data} options={options} />
      </div>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
      `}</style>
    </div>
  );
};

export default GenderPieChart;