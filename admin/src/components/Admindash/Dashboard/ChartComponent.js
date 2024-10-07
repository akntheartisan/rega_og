// MixedChartComponent.js
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement,PointElement, Title, Tooltip, Legend);

const MixedChartComponent = ({ userCount, totalEarnings, onlineCount, offlineCount }) => {
  const data = {
    labels: ['Users', 'Total Earnings', 'Online Products', 'Offline Products'],
    datasets: [
      {
        label: 'Count',
        data: [userCount, totalEarnings, onlineCount, offlineCount],
        backgroundColor: 'rgba(255, 165, 0, 0.5)', // Orange color for bar chart
        borderColor: 'rgba(255, 165, 0, 1)', // Darker orange for border
        borderWidth: 1,
        type: 'bar',
      },
      {
        label: 'Total Earnings',
        data: [0, totalEarnings, 0, 0], // Only show on total earnings index
        borderColor: 'rgba(0, 255, 0, 1)', // Green color for line
        type: 'line',
        fill: true,
        tension: 0.2,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Admin Dashboard Data',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count / Earnings',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Categories',
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default MixedChartComponent;
