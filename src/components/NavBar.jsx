import React, { useState } from "react";

import { Notif, Settings } from "./atomic";
function NavBar() {
  return (
    <div
      className={`h-14 w-full flex  items-center bg-white fixed z-10 top-0 shadow-md overflow-y-auto flex-row flex-nowrap  px-6 `}
    >
      <div className="right-5 fixed flex flex-row justify-center items-center">
        <Notif />
        <Settings />
      </div>
    </div>
  );
}

export default NavBar;
