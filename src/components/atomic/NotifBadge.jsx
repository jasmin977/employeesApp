import React, { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import Badge from "@mui/material/Badge";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Notification from "../Notification";
import Button from "@mui/material/Button";
function Notif() {
  const [count, setCount] = useState(1);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;
  const addNotif = () => {
    setCount(count + 1);
  };
  const seenNotif = () => {
    setCount(Math.max(count - 1, 0));
  };
  return (
    <div>
      <div
        className="mx-2 hover:bg-sky-50 px-5 py-2.5 rounded-md hover:cursor-pointer"
        aria-describedby={id}
        onClick={handleClick}
      >
        <Badge color="primary" badgeContent={count}>
          <IoNotificationsOutline name="notif" color="gray" size={25} />
        </Badge>
      </div>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <div>
              <Notification />
            </div>
          </Fade>
        )}
      </Popper>
    </div>
  );
}

export default Notif;
