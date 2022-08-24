import React from "react";

import {
  SideBar,
  ToDoOverview,
  BirthdayCard,
  EmployeePresence,
  HolidaysAndAbsences,
  NavBar,
} from "../components";

import { PageName } from "../components/atomic";

import EmployeeStatus from "../components/EmployeeStatus";

export default function Dashboard() {
  return (
    <div className="md:ml-64 bg-gray-100 pt-14 h-full ">
      <SideBar />
      <NavBar />
      <PageName>Dashboard</PageName>
      <div className="grid grid-rows-2 p-6">
        <div className="  grid cols-rows-3 grid-flow-col gap-4 ">
          <EmployeeStatus />
          <div className="grid rows-rows-3  gap-4 ">
            <EmployeePresence />
            <BirthdayCard />
          </div>
        </div>

        <div className="  py-6 grid  grid-cols-3 gap-4 ">
          <div className="   bg-white"></div>
          <ToDoOverview />
          <HolidaysAndAbsences />
        </div>
      </div>
    </div>
  );
}
