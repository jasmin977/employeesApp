import React from "react";
import { minutesToString } from "../../helpers/format-time";

function Arrival({ arrivedTime, color }) {
  const ARRIVAL_STATUS_COLOR = {
    "on Time": "#6ce63a",
    early: "#5FD5FB",
    late: "#ff5722",
  };

  return (
    <p
      className="text-center"
      style={{
        color: ARRIVAL_STATUS_COLOR[color],
      }}
    >
      {minutesToString(arrivedTime.time, "standard")} {arrivedTime.status}
    </p>
  );
}

export default Arrival;
