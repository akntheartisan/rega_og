import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

const ProductDoughnutChart = ({ onlineCount, offlineCount }) => {
  const data = {
    labels: ['Online Products', 'Offline Products'],
    datasets: [
      {
        label: 'Products Count',
        data: [onlineCount, offlineCount],  // Data for online and offline products
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',  // Color for online products
          'rgba(255, 99, 132, 0.6)',  // Color for offline products
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',  // Darker border color for online
          'rgba(255, 99, 132, 1)',  // Darker border color for offline
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: '300px', margin: '0 auto' }}>
      <h3 className="text-center">Product Distribution</h3>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default ProductDoughnutChart;
