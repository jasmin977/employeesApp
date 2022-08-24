import React from "react";

function HolidaysAndAbsences() {
  return (
    <div className="  p-4 bg-white rounded-md shadow-sm">
      <div className="font-semibold tracking-wide">Jours Ferié - Absences</div>
      <div className="font-medium text-sm text-gray-500">
        {`${new Date().getDate()} ${new Date().toLocaleString("default", {
          month: "long",
        })}
 ${new Date().getFullYear()}`}{" "}
      </div>
    </div>
  );
}

export default HolidaysAndAbsences;
