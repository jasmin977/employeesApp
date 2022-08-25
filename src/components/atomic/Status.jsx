import React, { useState, useEffect } from "react";
import { stringToMinutes } from "../../helpers/format-time";

function Status({ employee }) {
  const [now, setNow] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setNow(
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }, 1000);
  }, []);
  const getStatusColor = (startTime, endTime, status) => {
    // present or absent or null 5arej aw9at l3amal
    if (status === "absent") {
      if (
        stringToMinutes(now) > stringToMinutes(endTime) ||
        stringToMinutes(now) < stringToMinutes(startTime)
      )
        // too early or its too late

        return "bg-no_status";
      else return "bg-absent";
    } else return "bg-present";
  };
  const getStatusTextInfo = (startTime, endTime, status) => {
    if (status === "absent") {
      if (
        stringToMinutes(now) > stringToMinutes(endTime) ||
        stringToMinutes(now) < stringToMinutes(startTime)
      )
        // too early or its too late

        return "Out";
      else return "Absent";
    } else return "Present";
  };
  return (
    <div className="flex flex-row justify-start items-center">
      <div
        className={`${getStatusColor(
          employee.start_time,
          employee.end_time,
          employee.status
        )} w-4 h-4 rounded-full mx-2`}
      ></div>
      <p className="text-md text-slate-400">
        {getStatusTextInfo(
          employee.start_time,
          employee.end_time,
          employee.status
        )}
      </p>
    </div>
  );
}

export default Status;
