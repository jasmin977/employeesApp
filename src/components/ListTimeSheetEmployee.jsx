import React from "react";
import avatar from "../img/employee.png";
import { NavLink } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
function ListTimeSheetEmployee({ employee }) {
  return (
    <tr className="hover:bg-slate-100">
      <td className=" align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
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

      <td className="  border-b ">
        <div className="w-full flex items-center  h-12 border-x  border-slate-300   ">
          <div className="bg-orange-400 h-2 w-2"></div>
        </div>
      </td>
      <td className="  align-middle bg-transparent border-b ">
        <div className="w-full h-12 border-r  border-slate-300 "></div>
      </td>
      <td className="  align-middle bg-transparent border-b ">
        <div className="w-full h-12 border-r  border-slate-300 "></div>
      </td>
      <td className="  align-middle bg-transparent border-b ">
        <div className="w-full h-12 border-r  border-slate-300 "></div>
      </td>

      <td className="  align-middle bg-transparent border-b ">
        <div className="w-full h-12 border-r  border-slate-300 "></div>
      </td>
      <td className="  align-middle bg-transparent border-b ">
        <div className="w-full h-12 border-r  border-slate-300 "></div>
      </td>
      <td className="  align-middle bg-transparent border-b ">
        <div className="w-full h-12 border-r  border-slate-300 "></div>
      </td>
      <td className="  align-middle bg-transparent border-b ">
        <div className="w-full h-12 border-r  border-slate-300 "></div>
      </td>
      <td className="  align-middle bg-transparent border-b ">
        <div className="w-full h-12 border-r  border-slate-300 "></div>
      </td>
      <td className="  align-middle bg-transparent border-b ">
        <div className="w-full h-12 border-r  border-slate-300 "></div>
      </td>
      <td className="  align-middle bg-transparent border-b ">
        <div className="w-full h-12 border-r  border-slate-300 "></div>
      </td>
      <td className="  align-middle bg-transparent border-b ">
        <div className="w-full h-12 border-r  border-slate-300 "></div>
      </td>
      <td className="  align-middle bg-transparent border-b ">
        <div className="w-full h-12 border-r  border-slate-300 "></div>
      </td>
      <td className="  align-middle bg-transparent border-b ">
        <div className="w-full h-12 border-r  border-slate-300 "></div>
      </td>
      <td className="  align-middle bg-transparent border-b ">
        <div className="w-full h-12 border-r  border-slate-300 "></div>
      </td>
      <td className="  align-middle bg-transparent border-b ">
        <div className="w-full h-12 border-r  border-slate-300 "></div>
      </td>
      <td className="  align-middle bg-transparent border-b ">
        <div className="w-full h-12 border-r  border-slate-300 "></div>
      </td>
      <td className="  align-middle bg-transparent border-b ">
        <div className="w-full h-12  "></div>
      </td>
    </tr>
  );
}
export default ListTimeSheetEmployee;
