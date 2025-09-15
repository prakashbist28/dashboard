import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { IoClose } from "react-icons/io5";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HorBarCard = ({ title, totalCount, labels, datasets, onDelete }) => {
  const data = {
    labels,
    datasets: datasets.map((ds, i) => ({
      ...ds,
      borderRadius: 100, 
      barThickness: 25, 
    })),
  };

  const options = {
    indexAxis: "y", 
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            return datasets.map((ds, i) => {
              const total = ds.data.reduce((a, b) => a + b, 0);
              return {
                text: `${ds.label} (${total})`, // label with value
                fillStyle: ds.backgroundColor,
                strokeStyle: ds.backgroundColor,
                hidden: !chart.isDatasetVisible(i),
                datasetIndex: i,
              };
            });
          },
        },
      },
    },
    scales: {
      x: { stacked: true, display: false },
      y: { stacked: true, display: false },
    },
  };

  return (
    <div className="relative border-2 p-10 bg-white rounded-xl shadow-md w-full h-80 flex flex-col justify-center">
      <div className="flex flex-row justify-between">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <button
          onClick={onDelete}
          className="absolute border-2 rounded-full border-slate-900 top-2 right-2 text-black hover:text-white hover:bg-black duration-200"
        >
          <IoClose size={20} />
        </button>
      </div>
      <div className="flex font-sans font-medium gap-2"> {totalCount}  <p className="font-light"> Total </p></div>
      <Bar data={data} options={options}/>
    </div>
  );
};

export default HorBarCard;
