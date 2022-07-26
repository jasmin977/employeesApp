import React, { useEffect, useState } from "react";
import Moment from "moment";
import "../style/style.css";
function Clock() {
  const [clockState, setClockState] = useState();
  const [dateState, setDateState] = useState(Moment().format("MMM Do YY"));

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClockState(
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }, 1000);
  }, []);

  useEffect(() => {
    setInterval(() => {
      const formatDate = Moment().format("MMM Do YY");

      setDateState(formatDate);
    }, 1000 * 60 * 60);
  }, []);
  return (
    <div className="flex flex-col  items-center static top-[100vh]">
      <p className="font-medium text-5xl text-gray-600">{clockState}</p>
      <p className="font-medium text-2xl  text-gray-700">{dateState}</p>
    </div>
  );
}

export default Clock;
