import React, { useState, useEffect, useContext } from "react";
import { IoClose } from "react-icons/io5";
import { DashboardContext } from "../context/DashboardContext";

const FilterSidebar = ({ onClose }) => {
  const { dashboards, visibleCharts, toggleChartVisibility } = useContext(DashboardContext);

  const categories = dashboards.map((d) => d.id);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [closing, setClosing] = useState(false);

  const activeDashboard = dashboards.find((d) => d.id === activeCategory);

  const handleToggleChart = (chartId) => {
    toggleChartVisibility(chartId); // use Context function
  };

  const handleClose = () => {
    setClosing(true); // trigger fadeOut
  };

  useEffect(() => {
    if (closing) {
      const timer = setTimeout(() => {
        onClose(); // unmount after fadeOut
      }, 400); // match fadeOut duration
      return () => clearTimeout(timer);
    }
  }, [closing, onClose]);

  return (
    <div
      className={`fixed top-0 right-0 w-3/4 lg:w-1/3 h-full bg-white shadow-lg shadow-black/50 z-50 overflow-y-auto
        ${closing ? "animate-fadeOut" : "animate-fadeIn"}`}
    >
      {/* Header */}
      <div className="flex p-2 md:p-4 justify-between bg-blue-600">
        <div className="text-white font-sans font-semibold text-md md:text-lg lg:text-xl">
          Add Widget
        </div>
        <button
          className="text-white text-xl hover:text-blue-400 duration-200"
          onClick={handleClose}
        >
          <IoClose />
        </button>
      </div>

      <p className="flex font-sans font-medium p-2 text-sm md:text-lg lg:text-xl">
        Personalize the dashboard by adding following widgets
      </p>

      {/* Category Tabs */}
      <div className="flex font-sans m-2 space-x-4 mb-6 border-b transition-all duration-400 ease-in-out">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 ${
              activeCategory === cat
                ? "border-b-2 font-semibold border-blue-500 transition-all"
                : ""
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Chart Checkboxes */}
      <div className="space-y-2 p-2">
        {activeDashboard?.charts.map((chart) => (
          <label
            key={chart.id}
            className="flex p-2 hover:bg-slate-200 items-center border-2 space-x-2 cursor-pointer duration-300"
          >
            <input
              type="checkbox"
              checked={visibleCharts[chart.id] !== false}
              onChange={() => handleToggleChart(chart.id)}
            />
            <span>{chart.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
