import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement,LineController, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement,LineController, Title, Tooltip, Legend);

const DistrictChart = ({ districtData }) => {
  // Step 1: Count occurrences of each district
  const districtCount = districtData.reduce((acc, district) => {
    acc[district] = (acc[district] || 0) + 1;
    return acc;
  }, {});

  // Step 2: Find the max occurrence
  const maxCount = Math.max(...Object.values(districtCount));

  // Step 3: Calculate percentages for each district
  const districtNames = Object.keys(districtCount);
  const districtPercentages = districtNames.map(
    (name) => ((districtCount[name] / maxCount) * 100).toFixed(2)
  );

  // Step 4: Chart data
  const data = {
    labels: districtNames, // District names
    datasets: [
      {
        label: 'Percentage of Purchases',
        data: districtPercentages, // Percentage values
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        borderWidth: 1,
      },
    ],
  };

  // Step 5: Chart options
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Percentage (%)',
        },
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default DistrictChart;
