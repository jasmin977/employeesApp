import React, { useState,useContext } from "react";
import avatar from "../../img/employee.png";
import Button from "@mui/material/Button";
import { IoIosArrowDown } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { AuthContext } from "../../context/AuthContext";

function Settings() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);
  const { login,adminToken,setLoggedIn } = useContext(AuthContext);

  const logOut = () => {
    removeCookie("token");
    setLoggedIn(false);
    navigate("/login");

  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  return (
    <div>
      <Button
        className="mx-2 hover:bg-sky-50 px-5 py-2.5 rounded-md hover:cursor-pointer"
        aria-describedby={id}
        onClick={handleClick}
        endIcon={<IoIosArrowDown />}
      >
        <img
          src={avatar}
          className="inline-flex items-center justify-center  h-9 w-9 rounded-full"
          alt="admin"
        />
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <div className="   md:right-40 top-16 bg-white  rounded-lg w-fit">
              <div className="flex flex-col items-center">
                <div className=" flex flex-row hover:bg-gray-50 hover:cursor-pointer border-b-2 p-3 py-4">
                  <IoSettingsOutline
                    color="black"
                    size={20}
                    className="mx-2"
                  ></IoSettingsOutline>
                  <span>Settings</span>
                </div>
                <div
                  onClick={logOut}
                  className=" flex flex-row hover:bg-gray-50 hover:cursor-pointer   p-3 py-4"
                >
                  <BiLogOut color="black" size={20} className="mx-2"></BiLogOut>
                  <span>Log Out</span>
                </div>
              </div>
            </div>
          </Fade>
        )}
      </Popper>
    </div>
  );
}

export default Settings;
