import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { IoClose } from "react-icons/io5";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BarCard = ({ title, data, colors, onDelete }) => {
  const labels = Object.keys(data);
  const values = Object.values(data);
  const labelColors = Object.keys(colors || {});

  const backgroundColors = labelColors.map(
    (label) => (colors && colors[label]) || "#60a5fa"
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        backgroundColor: backgroundColors,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="relative border-2 bg-white p-8 rounded-xl shadow-md w-full h-80 flex flex-col justify-center">
      <div className="flex flex-row justify-between">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <button
          onClick={onDelete}
          className="absolute border-2 rounded-full border-slate-900 top-2 right-2 text-black hover:text-white hover:bg-black duration-200"
          aria-label="Delete widget"
        >
          <IoClose size={20} />
        </button>
      </div>

      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarCard;
