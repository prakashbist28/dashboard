import React from "react";
import { IoIosNotificationsOutline } from "react-icons/io";

export default function Headertile({search, setSearch}) {
  return (
    <div className="flex flex-row items-center bg-white gap-4 p-1 pb-2 md:p-4 justify-between border-b-2 shadow-md shadow-slate-500/40 hover:shadow-xl duration-200">
      <div className="flex flex-row w-[45%] md:w-1/2 justify-between">
        <div className="w-3/4 flex">
        <div className="pl-2 font-sans font-bold text-[12px] md:text-[14px] lg:text-[18px] cursor-pointer">Home</div>
        <div className="pl-2 font-semibold text-[12px] md:text-[14px] lg:text-[16px]"> &gt; </div>
        <div className="pl-2 font-sans text-blue-600 font-semibold text-[12px] md:text-[14px] lg:text-[18px] cursor-pointer">Dashboard</div>
        </div>
      </div>

      <div className="flex justify-between gap-4 md:gap-8 md:w-1/2 items-center">
  
        <input className="focus:border-blue-500 flex group md:w-1/2 items-center border-2 p-1 border-slate-400 rounded-lg lg:w-200px text-[12px] md:text-[14px] outline-none hover:border-blue-600 duration-300" value={search} onChange={(e)=> setSearch(e.target.value)} placeholder="🔍︎ search..."/>
        <div className="w-1/4 font-semibold font-sans text-xs md:text-[18px] cursor-pointer">username</div>
        <IoIosNotificationsOutline className="border-2 mr-2 md:mr-4 border-slate-600 text-2xl md:text-3xl hover:border-blue-600 rounded-full hover:bg-blue-600 hover:text-white duration-150 "/>
      </div>
    </div>
  );
}
