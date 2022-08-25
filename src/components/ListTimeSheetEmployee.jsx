import React from "react";

import { getPercentage, minutesToString } from "../helpers/format-time";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import "../style/style.css";
import { Arrival } from "./atomic";
const COLOR_STATUS = {
  no_status: "#ebecf5",
  present: "#6ce63a",
  absent: "#f44336",
  holiday: "#FDEBE9",
  late: "#ff5722",
  extra: "#5FD5FB",
};

const TEXT_COLOR_STATUS = {
  no_status: "#ebecf5",
  present: "#6ce63a",
  absent: "transparent",
  holiday: "#f44336",
  late: "#ff5722",
  extra: "#5FD5FB",
};

function ListTimeSheetEmployee({ userId, day, children }) {
  const navigator = useNavigate();
  return (
    <div
      onClick={() => navigator(`/timesheet/${userId}`)}
      className="table_body border-b hover:bg-slate-100 cursor-pointer"
    >
      <div className=" align-middle bg-transparent">{children}</div>
      {day.timesheet.length === 1 ? (
        <div
          style={{
            gridColumnStart: "2",
            gridColumnEnd: "18",
          }}
          className="whitespace-nowrap p-0"
        >
          <div
            style={{ borderLeft: "1px solid #f5f5f5" }}
            className="w-full flex items-center h-12 "
          >
            <Tooltip arrow title={`whole day`}>
              {day.timesheet[0].status === "absent" ? (
                <div
                  className="text-center font-medium align-middle"
                  style={{
                    width: `100%`,
                    height: "1rem",
                    fontSize: "0.75rem",
                    color: TEXT_COLOR_STATUS[day.timesheet[0].status],
                  }}
                  id="stripes"
                >
                  {day.timesheet[0].status}
                </div>
              ) : (
                <div
                  className="text-center font-medium align-middle"
                  style={{
                    background: COLOR_STATUS[day.timesheet[0].status],
                    width: `100%`,
                    height: "1rem",
                    fontSize: "0.75rem",
                    color: TEXT_COLOR_STATUS[day.timesheet[0].status],
                  }}
                >
                  {day.timesheet[0].status}
                </div>
              )}
            </Tooltip>
          </div>
        </div>
      ) : (
        day.timesheet.map((item, idx) => (
          <div
            className="whitespace-nowrap p-0"
            key={`_timesheet_${userId}__${idx}`}
          >
            <div
              style={{ borderLeft: "1px solid #f5f5f5" }}
              className="w-full flex items-center h-12 "
            >
              {item.map((i, r) => (
                <Tooltip
                  key={`_timesheet_${userId}__${idx}__interval_${r}`}
                  arrow
                  title={`start : ${i.start}, end : ${i.end}`}
                >
                  <div
                    className="interval"
                    style={{
                      background: COLOR_STATUS[i.status],
                      width: `${getPercentage(i.start, i.end)}%`,
                      height: "0.60rem",
                    }}
                  ></div>
                </Tooltip>
              ))}
            </div>
          </div>
        ))
      )}
      <Arrival arrivedTime={day.arrival} color={day.arrival.status} />

      {/* <p className="text-center">{employee.total}</p> */}
    </div>
  );
}
export default ListTimeSheetEmployee;
