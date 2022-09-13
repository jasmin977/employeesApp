import React, { useState, useContext, useEffect } from "react";
import "../style/App.css";
import { getMonth } from "../util";
import CalendarHeader from "../components/calendarComponents/CalendarHeader";
import Sidebar from "../components/calendarComponents/Sidebar";
import Month from "../components/calendarComponents/Month";
import GlobalContext from "../context/GlobalContext";
import EventModal from "../components/calendarComponents/EventModal";
function Calender() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}

      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currenMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Calender;
