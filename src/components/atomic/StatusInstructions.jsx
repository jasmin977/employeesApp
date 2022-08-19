import React from "react";

export default function StatusInstructions() {
  return (
    <div
      className="  my-2  flex flex-row  
        md:justify-end justify-center  text-gray-400 text-sm py-2   gap-2 "
    >
      <div className=" flex items-center ">
        <div className={`bg-present w-2 h-2 mx-1`}></div>
        <div>Working Hour</div>
      </div>
      <div className=" flex items-center ">
        <div className={`bg-no_status w-2 h-2 mx-1`}></div>
        <div>Out of Work</div>
      </div>
      <div className=" flex items-center ">
        <div className={`bg-extra w-2 h-2 mx-1`}></div>
        <div>Over Time</div>
      </div>
      <div className=" flex items-center ">
        <div className={`bg-late w-2 h-2 mx-1`}></div>
        <div>Late</div>
      </div>
    </div>
  );
}
