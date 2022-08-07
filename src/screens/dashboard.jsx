import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { SideBar } from "../components";

import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);

  const logOut = () => {
    removeCookie("token");
    navigate("/login");
  };
  return (
    <div className="md:ml-64">
      <SideBar />
      <div>dashboard</div>
      {/** <button onClick={logOut}>Log out</button>*/}
    </div>
  );
}
