import { createContext, useState, useEffect } from "react";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  // Load dashboards from localStorage if available, else fallback to JSON
  const storedDashboards = localStorage.getItem("dashboards");
  const initialDashboards = storedDashboards
    ? JSON.parse(storedDashboards)
    : require("../data/dashboarddata.json").dashboards;

  // Initialize visibility for all charts
  const allCharts = initialDashboards.reduce((acc, dashboard) => {
    dashboard.charts.forEach((chart) => (acc[chart.id] = true));
    return acc;
  }, {});

  const [dashboards, setDashboards] = useState(initialDashboards);
  const [visibleCharts, setVisibleCharts] = useState(allCharts);

  // Save dashboards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("dashboards", JSON.stringify(dashboards));
  }, [dashboards]);

  // Toggle visibility of a chart
  const toggleChartVisibility = (chartId) => {
    setVisibleCharts((prev) => ({ ...prev, [chartId]: !prev[chartId] }));
  };

  // Add a new widget to a dashboard
  const addWidget = (dashboardId, widget) => {
    setDashboards((prev) =>
      prev.map((dash) =>
        dash.id === dashboardId
          ? { ...dash, charts: [...dash.charts, widget] }
          : dash
      )
    );
  };

  // Delete a widget
  const deleteWidget = (dashboardId, chartId) => {
    setDashboards((prev) =>
      prev.map((dash) =>
        dash.id === dashboardId
          ? {
              ...dash,
              charts: dash.charts.filter((chart) => chart.id !== chartId),
            }
          : dash
      )
    );
  };

  return (
    <DashboardContext.Provider
      value={{
        dashboards,
        visibleCharts,
        toggleChartVisibility,
        addWidget,
        deleteWidget,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
