import React, { useState } from "react";
import Popper from "@mui/material/Popper";
import Zoom from "@mui/material/Zoom";
function MonthChanger({ thisMonth, setter }) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const [month, setMonth] = useState(thisMonth);
  const MonthName = [
    "",
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && anchorEl;
  const idd = canBeOpen ? "transition-popper" : undefined;

  const chooseMonth = (m) => {
    setter(m + 1);
    setMonth(m + 1);
    setOpen((previousOpen) => !previousOpen);
  };
  return (
    <div>
      <span className="text-sm text-gray-500 p-4">
        Pointage durant le mois du{" "}
      </span>
      <button
        className="bg-slate-200 p-2  rounded-md"
        aria-describedby={idd}
        type="button"
        onClick={handleClick}
      >
        <span className="capitalize font-semibold text-base text-gray-800 ">
          {" "}
          {MonthName[month]}
        </span>
        <span> {new Date().getFullYear()}</span>
      </button>
      <Popper id={idd} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Zoom {...TransitionProps} timeout={350}>
            <div className="bg-white m-1 rounded-sm shadow-md ">
              <div className="grid grid-cols-3 gap-2">
                {[
                  "Janv",
                  "Fev",
                  "Mars",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ].map((m, idx) => (
                  <div
                    onClick={() => chooseMonth(idx)}
                    key={idx}
                    className=" font-medium py-1 px-4 hover:bg-slate-700 hover:text-white
                     hover:cursor-pointer hover:rounded-sm"
                  >
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </Zoom>
        )}
      </Popper>
    </div>
  );
}

export default MonthChanger;
