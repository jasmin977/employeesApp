import React from "react";
import { PageName } from "../components/atomic";
import SideBar from "../components/SideBar";
function Calender() {
  return (
    <div className="md:ml-64">
      <SideBar />
      <PageName>calender</PageName>
    </div>
  );
}

export default Calender;
