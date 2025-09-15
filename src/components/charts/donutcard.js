import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { IoClose } from "react-icons/io5";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutCard = ({ title, data, colors, onDelete }) => {
  const labels = Object.keys(data);
  const label_color = Object.keys(colors);
  const values = Object.values(data);
  const total = values.reduce((sum, v) => sum + v, 0);

  const backgroundColors = label_color.map(
    (label) => (colors && colors[label]) || "#60a5fa"
  );

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          boxWidth: 20,
          padding: 5,
          font: {
            size: (ctx) => {
              const h = ctx.chart.chartArea
                ? ctx.chart.chartArea.height
                : ctx.chart.height;
              return Math.max(10, Math.round(h / 20));
            },
          },
          generateLabels: (chart) => {
            const { labels, datasets } = chart.data;
            if (labels.length && datasets.length) {
              return labels.map((label, i) => {
                const value = datasets[0].data[i];
                return {
                  text: `${label} (${value})`,
                  fillStyle: datasets[0].backgroundColor[i],
                  strokeStyle: datasets[0].backgroundColor[i],
                  index: i,
                };
              });
            }
            return [];
          },
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };


  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart) => {
      const ctx = chart.ctx;
      ctx.save();

      const x =
        chart.chartArea?.left + chart.chartArea?.width / 2 || chart.width / 2;
      const y =
        chart.chartArea?.top + chart.chartArea?.height / 2 || chart.height / 2;

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "lighter 14px Arial";
      ctx.fillStyle = "#111";
      ctx.fillText("Total", x, y + 12);

      ctx.font = "bold 18px Arial";
      ctx.fillStyle = "#111";
      ctx.fillText(total.toString(), x, y - 12);

      ctx.restore();
    },
  };

  return (
    <div className="relative bg-white p-8 rounded-xl border-2 shadow-md w-full h-80 flex flex-col justify-center">
      <div className="flex flex-row justify-between">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <button
          onClick={onDelete}
          className="absolute border-2 rounded-full border-slate-900 top-2 right-2 text-black hover:text-white hover:bg-black duration-200"
        >
          <IoClose size={20} />
        </button>
      </div>

      <Doughnut
        data={chartData}
        options={options}
        plugins={[centerTextPlugin]}
      />
    </div>
  );
};

export default DonutCard;
