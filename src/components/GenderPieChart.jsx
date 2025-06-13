import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GenderPieChart = ({ genderData }) => {
  const colors = {
    male: '#ECF87E',
    female: '#14919B',
    background: '#F8FAFC',
    text: '#0F172A'
  };

  const data = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        data: [genderData.males, genderData.females],
        backgroundColor: [colors.male, colors.female],
        borderColor: colors.background,
        borderWidth: 2,
        hoverOffset: 10
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
          color: colors.text,
          font: {
            family: "'Inter', sans-serif",
            size: 12,
            weight: '500'
          },
          padding: 20,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: colors.text,
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: colors.male,
        borderWidth: 1,
        padding: 12,
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
    cutout: '70%',
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  return (
    <div className="w-full h-full p-2">
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs px-2 py-1 rounded-md font-medium" 
                  style={{ backgroundColor: '#EFF6FF', color: colors.male }}>
              {genderData.males} Male
            </span>
            <span className="text-xs px-2 py-1 rounded-md font-medium" 
                  style={{ backgroundColor: '#FEF9C3', color: '#0F172A' }}>
              {genderData.females} Female
            </span>
          </div>
        </div>
        <div className="flex-grow">
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default GenderPieChart;