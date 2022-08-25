import React, { useState } from "react";
import avatar from "../img/employee.png";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useCookies } from "react-cookie";

import Notif from "./atomic/NotifBadge";
function NavBar() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(!open);
  };
  const logOut = () => {
    removeCookie("token");
    navigate("/login");
  };
  return (
    <div
      className={`h-14 w-full flex  items-center bg-white fixed z-10 top-0 shadow-md overflow-y-auto flex-row flex-nowrap  px-6 `}
    >
      <div className="right-5 fixed flex flex-row justify-center items-center">
        <Notif />
        <Button
          id="basic-menu"
          onClick={handleClose}
          endIcon={<IoIosArrowDown />}
        >
          <img
            src={avatar}
            className="inline-flex items-center justify-center  h-9 w-9 rounded-full"
            alt="admin"
          />
        </Button>
      </div>
    </div>
  );
}

export default NavBar;
