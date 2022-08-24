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

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          onClick={handleClick}
          endIcon={<IoIosArrowDown />}
        >
          <img
            src={avatar}
            className="inline-flex items-center justify-center  h-9 w-9 rounded-full"
            alt="admin"
          />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <MenuItem onClick={logOut}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default NavBar;
