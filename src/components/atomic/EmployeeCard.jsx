import React from "react";

function EmployeeCard({ Icon, text, data, color }) {
  return (
    <div className="flex flex-row items-center pl-8 p-3 h-fit w-fit">
      <Icon color="blue" size={25} className="" />
      <div className="px-3">
        <div style={{ marginBottom: -7, color: color }} className="text-xl">
          {data.length}
        </div>
        <div className="text-xs font-medium text-gray-400 ">{text}</div>
      </div>
    </div>
  );
}

export default EmployeeCard;
