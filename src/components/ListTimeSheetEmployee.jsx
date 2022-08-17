import React from "react";
import avatar from "../img/employee.png";
import { NavLink } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { getPercentage, minutesToString } from "../helpers/format-time";
import { Tooltip } from "@mui/material";

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
      <td className=" align-middle bg-transparent">
        <div className="flex items-center px-2 py-1 ">
          <div>
            <img
              src={
                employee.profile_IMG === "defaulIMG"
                  ? avatar
                  : employee.profile_IMG
              }
              className="inline-flex items-center justify-center mr-4 text-white transition-all duration-200 ease-soft-in-out text-sm h-9 w-9 rounded-xl"
              alt="user1"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h6 className="text-sm">
              {employee.firstname} {employee.lastname}
            </h6>
            <p className="text-xs text-slate-400">{employee.phone_number}</p>
          </div>
        </div>
      </td>
      {employee.timesheet.map((item, idx) => (
        <td
          className="whitespace-nowrap p-0"
          key={`${employee.firstname}_timesheet_${employee.userId}__${idx}`}
        >
          <div
            style={{ borderLeft: "1px solid #f5f5f5" }}
            className="w-full flex items-center h-12 "
          >
            {item.map((i, r) => (
              <Tooltip arrow title={`start : ${i.start}, end : ${i.end}`}>
                <div
                  key={`${employee.firstname}_timesheet_${employee.userId}__${idx}__interval_${r}`}
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
        </td>
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

    /*
    <tr className="hover:bg-slate-100">
      <td className=" align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
        <div className="flex items-center px-2 py-1">
          <div>
            <img
              src={
                employee.profile_IMG === "defaulIMG"
                  ? avatar
                  : employee.profile_IMG
              }
              className="inline-flex items-center justify-center mr-4 text-white transition-all duration-200 ease-soft-in-out text-sm h-9 w-9 rounded-xl"
              alt="user1"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h6 className="text-sm">
              {employee.firstname} {employee.lastname}
            </h6>
            <p className="text-xs text-slate-400">{employee.phone_number}</p>
          </div>
        </div>
      </td>
      {employee.timesheet.map((item, idx) => (
        <td
          className="border-b whitespace-nowrap p-0"
          key={`${employee.firstname}_timesheet_${employee.userId}__${idx}`}
        >
          <div
            style={{ borderLeft: "1px solid #f5f5f5" }}
            className="w-full flex items-center h-12 border-slate-300"
          >
            {item.map((i, r) => (
              <Tooltip arrow title={`start : ${i.start}, end : ${i.end}`}>
                <div
                  key={`${employee.firstname}_timesheet_${employee.userId}__${idx}__interval_${r}`}
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
        </td>
      ))}
      <td className="align-middle bg-transparent border-b ">
        <p
          className="text-lg font-medium"
          style={{
            color: ARRIVAL_STATUS_COLOR[employee.arrival.status],
          }}
        >
          {minutesToString(employee.arrival.time, "standard")}
          {employee.arrival.status}
        </p>
      </td>
      <td className="  align-middle bg-transparent border-b ">
        <p className="text-lg font-medium">{employee.total}</p>
      </td>
    </tr>
    */
  );
}
export default ListTimeSheetEmployee;
