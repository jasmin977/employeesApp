import React from "react";
import avatar from "../../img/employee.png";

export default function EmployeeInfoPreview({ employee }) {
  return (
    <div className="flex items-center px-2 py-1 ">
      <div>
        <img
          src={
            employee.profile_IMG === "defaulIMG" ? avatar : employee.profile_IMG
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
  );
}
