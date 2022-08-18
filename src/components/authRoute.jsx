import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

export default function AuthRoute({ children }) {
  const [redirect, setredirect] = useState(false);
  const [isLoggedin, setisLoggedin] = useState(false);
  const [cookies, removeCookie] = useCookies([]);

  useEffect(() => {
    axios
      .post("/api/auth/verify")
      .then(({ data }) => {
        if (data.status) {
          setisLoggedin(true);
        }
      })
      .catch((err) => {
        removeCookie("token");
      })
      .finally(() => setredirect(true));
  }, []);

  return redirect ? isLoggedin ? children : <Navigate to={"/login"} /> : <></>;
}
