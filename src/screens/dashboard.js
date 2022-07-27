import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);

  const logOut = () => {
    removeCookie("token");
    navigate("/login");
  };
  return (
    <>
      <div>
        <h1>home Page</h1>
        <button onClick={logOut}>Log out</button>
      </div>
    </>
  );
}
