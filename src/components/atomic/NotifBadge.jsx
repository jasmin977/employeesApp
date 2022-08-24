import React, { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import Badge from "@mui/material/Badge";

import Notification from "../Notification";

function Notif() {
  const [count, setCount] = useState(1);
  const [invisible, setInvisible] = useState(false);

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };
  const addNotif = () => {
    setCount(count + 1);
  };
  const seenNotif = () => {
    setCount(Math.max(count - 1, 0));
  };
  return (
    <div className="mx-2 hover:bg-sky-50 px-5 py-2.5 rounded-md hover:cursor-pointer">
      <Badge color="primary" badgeContent={count}>
        <IoNotificationsOutline name="notif" color="gray" size={25} />
      </Badge>
    </div>
  );
}

export default Notif;
