import React, { useState } from "react";
import avatar from "../img/employee.png";
import { NavLink } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
function ListEmployee({ employee }) {
  return (
    <tr className="hover:bg-slate-100">
      <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
        <div className="flex px-2 py-1">
          <div>
            <img
              src={
                employee.profile_IMG === "defaulIMG"
                  ? avatar
                  : employee.profile_IMG
              }
              className="inline-flex items-center justify-center mr-4 text-white transition-all duration-200 ease-soft-in-out text-size-sm h-9 w-9 rounded-xl"
              alt="user1"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h6 className="mb-0 leading-normal text-size-sm">
              {employee.firstname} {employee.lastname}
            </h6>
            <p className="mb-0 leading-tight text-size-xs text-slate-400">
              {employee.phone_number}
            </p>
          </div>
        </div>
      </td>
      <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
        <p className="mb-0 font-semibold leading-tight text-size-xs">
          {employee.matricul}
        </p>
        <p className="mb-0 leading-tight text-size-xs text-slate-400">
          {employee.matricul}
        </p>
      </td>
      <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-size-sm whitespace-nowrap shadow-transparent">
        <div className="bg-lime-600 w-4 h-4 rounded-full  inline-block   align-baseline "></div>
      </td>
      <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
        <span className="font-semibold leading-tight text-size-xs text-slate-400">
          {employee.employee_since}
        </span>
      </td>
      <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
        <NavLink to={`/employee/${employee.id}`} exact="true">
          <AiOutlineEye name="dashboard" size={25} />
        </NavLink>
      </td>
    </tr>
  );
}
export default ListEmployee;
