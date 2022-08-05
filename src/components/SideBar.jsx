import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineSpaceDashboard, MdOutlineTask } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { AiOutlineFieldTime } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import Clock from "../components/clock";

function SideBar() {
  const [showSidebar, setShowSidebar] = useState("-left-64");
  return (
    <>
      <div
        className={`h-screen  bg-gradient-to-t  from-my-sky-blue to-my-dark-blue fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
      >
        <div className="flex-col items-stretch  min-h-full flex-nowrap px-0 relative">
          <NavLink to="/dashboard" exact="true">
            <div className="bg-[url('../img/logo.png')] bg-no-repeat w-29 h-40 bg-contain justify-self-center"></div>
          </NavLink>

          <div className="flex flex-col ">
            <ul className="flex-col min-w-full flex list-none">
              <li className="rounded-lg mb-1 mt-3 hover:bg-my-sky-blue-transparent  ">
                <NavLink
                  to="/dashboard"
                  exact="true"
                  className="flex items-center gap-4 text-sm text-white font-medium px-4 py-3 rounded-lg"
                  activeclassname="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <MdOutlineSpaceDashboard name="dashboard" size={25} />
                  Tableau de Board
                </NavLink>
              </li>
              <li className="rounded-lg mb-1  hover:bg-my-sky-blue-transparent">
                <NavLink
                  to="/employees"
                  exact="true"
                  className="flex items-center gap-4 text-sm text-white font-medium px-4 py-3 rounded-lg"
                  activeclassname="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <FiUsers name="settings" size={25} />
                  Employés
                </NavLink>
              </li>
              <li className="rounded-lg mb-1  hover:bg-my-sky-blue-transparent ">
                <NavLink
                  to="/timesheets"
                  exact="true"
                  className="flex items-center gap-4 text-sm text-white font-medium px-4 py-3 rounded-lg"
                  activeclassname="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <AiOutlineFieldTime name="toc" size={25} />
                  Feuilles de Temps
                </NavLink>
              </li>
              <li className="rounded-lg mb-1  hover:bg-my-sky-blue-transparent">
                <NavLink
                  to="/todo"
                  exact="true"
                  className="flex items-center gap-4 text-sm text-white font-medium px-4 py-3 rounded-lg"
                  activeclassname="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <MdOutlineTask name="map" size={25} />
                  Tàches
                </NavLink>
              </li>
              <li className="px-4 rounded-lg mb-1  hover:bg-my-sky-blue-transparent">
                <NavLink
                  exact="true"
                  to="/calender"
                  activeclassname="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                  className="flex items-center gap-4 text-sm text-white font-medium py-3"
                >
                  <BiCalendar name="fingerprint" size={25} />
                  Calendrier
                </NavLink>
              </li>
            </ul>

            <ul className="flex-col min-w-full flex list-none absolute bottom-0">
              <Clock color={"white"} />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
