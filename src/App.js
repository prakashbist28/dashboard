import './App.css';
import Headertile from './components/header';
import { useState, useContext } from 'react';
import CspmDashboard from './components/cspm';
import CwppDashboard from './components/cwpp';
import RegistryScanDashboard from './components/registryscan';
import FilterSidebar from './components/filterbar';
import { SlRefresh, SlOptionsVertical } from "react-icons/sl";
import { GoClockFill } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { DashboardContext } from "./context/DashboardContext";

function App() {
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { dashboards, visibleCharts, toggleChartVisibility } = useContext(DashboardContext);

  return (
    <div className="App relative bg-slate-100">
      <Headertile search={search} setSearch={setSearch} />

      {/* Header buttons */}
      <div className='flex flex-col md:flex-row justify-between p-2 pt-4 md:p-4 md:items-center'>
        <div className='flex font-bold md:w-1/3 text-xl md:text-2xl lg:text-4xl'> CNPP Dashboards</div>
        <div className='pt-2'>
        <div className='flex gap-2 md:gap-6 lg:gap-8'>
          <button
            className="text-xs flex items-center gap-2 md:text-lg lg:text-xl p-2 h-10 md:h-12 border-2 rounded-md border-slate-400 text-slate-500 hover:border-blue-500 hover:bg-blue-500 hover:text-white md:p-4 shadow-md duration-200"
            onClick={() => setSidebarOpen(true)}
          >
            Add widgets
          </button>
          <button onClick={() => window.location.reload()} className=' border-2 p-2 h-10 md:h-12 flex items-center border-slate-400 text-slate-500 hover:border-blue-500 hover:bg-blue-500 hover:text-white rounded-md md:px-2 md:py-2 shadow-md duration-200'>
            <SlRefresh className='text-[12px] md:text-lg lg:text-xl'/>
          </button>
          <div className=' border-2 p-2 h-10 md:h-12 flex items-center border-slate-400 text-slate-500 hover:border-blue-500 hover:bg-blue-500 hover:text-white rounded-md md:p-2 shadow-md duration-200'>
            <SlOptionsVertical  className='text-sm md:text-lg lg:text-xl'/>
          </div>
          <div className=' group p-2 h-10 md:h-12 gap-2 border-2 flex items-center border-slate-400 text-slate-500 hover:border-blue-500 hover:bg-blue-500 hover:text-white rounded-md md:p-2 shadow-md duration-200'>
            <GoClockFill className='text-blue-500 group-hover:text-white text-sm md:text-lg lg:text-xl'/>
            <p className=' text-blue-500 font-medium group-hover:text-white text-xs md:text-lg lg:text-xl'>Last 2 days</p>
            <IoIosArrowDown className='text-sm md:text-lg lg:text-xl'/>
          </div>
        </div>
        </div>
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <FilterSidebar
          visibleCharts={visibleCharts}
          toggleChartVisibility={toggleChartVisibility}
          onClose={() => setSidebarOpen(false)}
        />
      )}

      {/* Dashboards */}
      <div className="p-6 space-y-12">
        {dashboards.map((dash) => {
          if (dash.id === "cspm") return <CspmDashboard key={dash.id} search={search} />;
          if (dash.id === "cwpp") return <CwppDashboard key={dash.id} search={search} />;
          if (dash.id === "registry") return <RegistryScanDashboard key={dash.id} search={search} />;
        })}
      </div>
    </div>
  );
}

export default App;
