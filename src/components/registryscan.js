
import React, { useState, useContext } from "react";
import HorBarCard from "./charts/horzcard";
import { DashboardContext } from "../context/DashboardContext";

const RegistryScanDashboard = ({ search }) => {
  const { dashboards, visibleCharts, addWidget, deleteWidget } =
    useContext(DashboardContext);

  const registryCategory = dashboards.find((cat) => cat.id === "registry");

  const [showForm, setShowForm] = useState(false);
  const [newWidget, setNewWidget] = useState({
    name: "",
    labels: "",
    datasets: "",
    colors: "",
  });

  const handleAddWidget = () => {
    if (!newWidget.name || !newWidget.labels || !newWidget.datasets || !newWidget.colors) {
      alert("Please fill all fields!");
      return;
    }

    // Parse labels
    const parsedLabels = newWidget.labels.split(",").map((l) => l.trim());

    // Parse datasets
    const datasetLabelValues = newWidget.datasets.split(",").map((ds) =>
      ds.trim().split(":").map((s) => s.trim())
    );

    const parsedColors = newWidget.colors.split(",").map((c) => c.trim());

    if (datasetLabelValues.length !== parsedColors.length) {
      alert("Number of datasets and colors must match!");
      return;
    }

    const parsedDatasets = datasetLabelValues.map(([label, values], index) => ({
      label,
      data: values.split("|").map((v) => Number(v)),
      backgroundColor: parsedColors[index],
    }));

    const widget = {
      id: `registry-${Date.now()}`,
      name: newWidget.name,
      labels: parsedLabels,
      datasets: parsedDatasets,
    };

    addWidget("registry", widget);
    setNewWidget({ name: "", labels: "", datasets: "", colors: "" });
    setShowForm(false);
  };

  const handleDeleteWidget = (id) => {
    deleteWidget("registry", id);
  };

  const filteredWidgets = registryCategory.charts.filter((w) => {
    const matchedSearch = w.name.toLowerCase().includes(search.toLowerCase());
    return visibleCharts[w.id] !== false && matchedSearch;
  });

  return (
    <section className="p-6">
      <h2 className="text-2xl flex font-bold mb-6">{registryCategory.name}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWidgets.map((widget) => {
          const totalCount = widget.datasets.reduce(
            (sum, ds) => sum + ds.data.reduce((a, b) => a + b, 0),
            0
          );

          return (
            <HorBarCard
              key={widget.id}
              title={widget.name}
              labels={widget.labels}
              datasets={widget.datasets}
              totalCount={totalCount}
              onDelete={() => handleDeleteWidget(widget.id)}
            />
          );
        })}

        <div
          onClick={() => setShowForm(true)}
          className="bg-gray-100 w-full h-80 hover:bg-gray-200 cursor-pointer rounded-xl shadow-md flex items-center justify-center"
        >
          <span className="text-lg font-semibold">+ Add Widget</span>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white p-6 shadow-lg rounded-xl max-w-md">
            <h3 className="text-xl font-bold mb-4">Add New Horizontal Bar Chart</h3>

            <input
              type="text"
              placeholder="Chart Name"
              value={newWidget.name}
              onChange={(e) => setNewWidget({ ...newWidget, name: e.target.value })}
              className="w-full border p-2 mb-3 rounded"
            />
            <input
              type="text"
              placeholder="Labels (comma separated)"
              value={newWidget.labels}
              onChange={(e) => setNewWidget({ ...newWidget, labels: e.target.value })}
              className="w-full border p-2 mb-3 rounded"
            />
            <input
              type="text"
              placeholder="Datasets (e.g. Critical:10|20|30, High:5|15|25)"
              value={newWidget.datasets}
              onChange={(e) => setNewWidget({ ...newWidget, datasets: e.target.value })}
              className="w-full border p-2 mb-3 rounded"
            />
            <input
              type="text"
              placeholder="Colors (comma separated, e.g. #f87171, #facc15)"
              value={newWidget.colors}
              onChange={(e) => setNewWidget({ ...newWidget, colors: e.target.value })}
              className="w-full border p-2 mb-3 rounded"
            />

            <div className="flex gap-3">
              <button
                onClick={handleAddWidget}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RegistryScanDashboard;
