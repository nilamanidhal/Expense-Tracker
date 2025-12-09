import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register the chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

const ChartComponent = ({ expenses }) => {
  // 1. Calculate totals per category
  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
    return acc;
  }, {});

  // 2. Prepare data for Chart.js
  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: 'Expenses (₹)',
        data: Object.values(categoryTotals),
        backgroundColor: [
          '#3B82F6', // Blue (Food)
          '#10B981', // Green (Transport)
          '#F59E0B', // Yellow (Utilities)
          '#EF4444', // Red (Entertainment)
          '#8B5CF6', // Purple (Others)
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom', // Move legend to bottom
      },
    },
  };

  return (
    <div className="bg-white p-6 shadow rounded-lg flex flex-col items-center justify-center">
      <h3 className="text-lg font-bold text-gray-700 mb-4">Spending Analysis</h3>
      <div className="w-64 h-64"> {/* Fixed size to prevent it from getting too huge */}
        {Object.keys(categoryTotals).length > 0 ? (
          <Doughnut data={data} options={options} />
        ) : (
          <p className="text-gray-400 mt-10">No data to display</p>
        )}
      </div>
    </div>
  );
};

export default ChartComponent;