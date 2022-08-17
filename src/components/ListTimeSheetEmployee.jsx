import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { getPercentage, minutesToString } from "../helpers/format-time";
import { Tooltip } from "@mui/material";
import { EmployeeInfoPreview } from "./atomic";

const COLOR_STATUS = {
  no_status: "#ebecf5",
  present: "#6ce63a",
  absent: "#f44336",
  late: "#ff5722",
  extra: "blue",
};

const ARRIVAL_STATUS_COLOR = {
  "on Time": "green",
  early: "blue",
  late: "red",
};

function ListTimeSheetEmployee({ employee }) {
  return (
    <div className="hover:bg-slate-100 table_body border-b">
      <div className=" align-middle bg-transparent">
        <EmployeeInfoPreview employee={employee} />
      </div>
      {employee.timesheet.map((item, idx) => (
        <div
          className="whitespace-nowrap p-0"
          key={`${employee.firstname}_timesheet_${employee.userId}__${idx}`}
        >
          <div
            style={{ borderLeft: "1px solid #f5f5f5" }}
            className="w-full flex items-center h-12 "
          >
            {item.map((i, r) => (
              <Tooltip
                key={`_timesheet_${employee.userId}__${idx}__interval_${r}`}
                arrow
                title={`start : ${i.start}, end : ${i.end}`}
              >
                <div
                  className="interval"
                  style={{
                    background: COLOR_STATUS[i.status],
                    width: `${getPercentage(i.start, i.end)}%`,
                    height: "0.5rem",
                  }}
                ></div>
              </Tooltip>
            ))}
          </div>
        </div>
      ))}
      <p
        className="text-center"
        style={{
          color: ARRIVAL_STATUS_COLOR[employee.arrival.status],
        }}
      >
        {minutesToString(employee.arrival.time, "standard")}{" "}
        {employee.arrival.status}
      </p>

      <p className="text-center">{employee.total}</p>
    </div>
  );
}
export default ListTimeSheetEmployee;
