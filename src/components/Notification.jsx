import React from "react";

import Button from "@mui/material/Button";
import avatar from "../img/employee.png";

const Notification = () => {
  const chatData = [
    {
      image: avatar,
      message: "New Pointage!",
      desc: "Chaima just came",
      time: "9:08 AM",
    },
    {
      image: avatar,
      message: "Birthday",
      desc: "Today is salma's birthday",
      time: "11:56 AM",
    },
    {
      image: avatar,
      message: "New Pointage",
      desc: "Yasmin just left!",
      time: "4:39 AM",
    },
  ];

  return (
    <div className="   md:right-40 top-16 bg-white  p-8 rounded-lg w-80">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg text-sky-700">Notifications</p>
          <button
            type="button"
            className="text-blue-400 text-xs rounded p-1 px-2  "
          >
            {" "}
            3 New
          </button>
        </div>
      </div>
      <div className="mt-5 ">
        {chatData.map((item, index) => (
          <div
            key={index}
            className="flex items-center leading-8 gap-5  p-3 hover:bg-slate-50 hover:cursor-pointer"
          >
            <img
              className="rounded-full h-10 w-10"
              src={item.image}
              alt={item.message}
            />
            <div>
              <p className="font-semibold text-sky-600">{item.message}</p>
              <p className="text-gray-500 text-sm "> {item.desc} </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
