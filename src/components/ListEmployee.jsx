import React from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { EmployeeInfoPreview, Status } from "./atomic";
function ListEmployee({ employee }) {
  const navigator = useNavigate();

  return (
    <tr
      onClick={() => navigator(`/employee/${employee.id}`)}
      className="hover:bg-slate-100 cursor-pointer "
    >
      <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
        <EmployeeInfoPreview employee={employee} />
      </td>
      <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
        <p className="mb-0 font-semibold leading-tight text-xs">
          {employee.matricul}
        </p>
        <p className="mb-0 leading-tight text-xs text-slate-400">
          {employee.matricul}
        </p>
      </td>
      <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
        <span className="font-semibold leading-tight text-xs text-slate-400">
          {employee.start_time}
        </span>
      </td>
      <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
        <span className="font-semibold leading-tight text-xs text-slate-400">
          {employee.end_time}
        </span>
      </td>

      <td className="p-2  align-middle border-b  ">
        <Status employee={employee} />
      </td>
      <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap ">
        <span className="font-semibold leading-tight text-xs text-slate-400">
          {employee.employee_since}
        </span>
      </td>
    </tr>
  );
}
export default ListEmployee;
