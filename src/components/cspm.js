import React, { useState, useContext } from "react";
import DonutCard from "./charts/donutcard";
import { DashboardContext } from "../context/DashboardContext";

const CspmDashboard = ({ search }) => {
  const { dashboards, visibleCharts, addWidget, deleteWidget } = useContext(DashboardContext);

  const cspmDashboard = dashboards.find((d) => d.id === "cspm");
  const [showForm, setShowForm] = useState(false);
  const [newWidget, setNewWidget] = useState({
    name: "",
    tags: "",
    tagValues: "",
    colors: "",
  });

  const handleAddWidget = () => {
    if (!newWidget.name || !newWidget.tags || !newWidget.tagValues || !newWidget.colors) {
      alert("Please fill all fields!");
      return;
    }

    const parsedTagValues = {};
    newWidget.tagValues.split(",").forEach((pair) => {
      const [key, value] = pair.split(":").map((s) => s.trim());
      if (key && value) parsedTagValues[key] = Number(value);
    });

    const parsedTags = newWidget.tags.split(",").map((t) => t.trim());
    const parsedColors = newWidget.colors.split(",").map((c) => c.trim());

    if (parsedTags.length !== parsedColors.length) {
      alert("Number of tags and colors must match!");
      return;
    }

    const newChart = {
      id: `cspm-${Date.now()}`,
      name: newWidget.name,
      tags: parsedTags,
      tagValues: parsedTagValues,
      colors: parsedColors.reduce((acc, color, i) => {
        acc[parsedTags[i]] = color;
        return acc;
      }, {}),
    };

    addWidget("cspm", newChart);
    setNewWidget({ name: "", tags: "", tagValues: "", colors: "" });
    setShowForm(false);
  };

  const handleDeleteWidget = (id) => {
    deleteWidget("cspm", id);
  };

  const filteredWidgets = cspmDashboard.charts.filter((w) => {
    const matchedSearch = w.name.toLowerCase().includes(search.toLowerCase());
    return visibleCharts[w.id] !== false && matchedSearch;
  });

  return (
    <section className="p-2 md:p-6">
      <h2 className="text-xl md:text-2xl flex font-bold mb-6">{cspmDashboard.name}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWidgets.map((widget) => (
          <DonutCard
            key={widget.id}
            title={widget.name}
            data={widget.tagValues}
            colors={widget.colors}
            onDelete={() => handleDeleteWidget(widget.id)}
          />
        ))}

        <div
          onClick={() => setShowForm(true)}
          className="bg-gray-100 w-full h-80 hover:bg-gray-200 cursor-pointer rounded-xl shadow-md flex items-center justify-center"
        >
          <span className="text-lg font-semibold">+ Add Widget</span>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="mt-6 bg-white p-6 shadow-lg rounded-xl max-w-md">
            <h3 className="text-xl font-bold mb-4">Add New Widget</h3>
            <input
              type="text"
              placeholder="Widget Name"
              value={newWidget.name}
              onChange={(e) => setNewWidget({ ...newWidget, name: e.target.value })}
              className="w-full border p-2 mb-3 rounded"
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={newWidget.tags}
              onChange={(e) => setNewWidget({ ...newWidget, tags: e.target.value })}
              className="w-full border p-2 mb-3 rounded"
            />
            <input
              type="text"
              placeholder="Tag Values (e.g. Critical:10, High:20)"
              value={newWidget.tagValues}
              onChange={(e) => setNewWidget({ ...newWidget, tagValues: e.target.value })}
              className="w-full border p-2 mb-3 rounded"
            />
            <input
              type="text"
              placeholder="Colors (comma separated, e.g. #FF0000, #00FF00)"
              value={newWidget.colors}
              onChange={(e) => setNewWidget({ ...newWidget, colors: e.target.value })}
              className="w-full border p-2 mb-3 rounded"
            />
            <div className="flex gap-3">
              <button onClick={handleAddWidget} className="bg-blue-500 text-white px-4 py-2 rounded">
                Add
              </button>
              <button onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CspmDashboard;
