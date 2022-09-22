import axios from "axios";
import React, { useEffect, useContext } from "react";

import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AuthRoute({ children }) {
  const { isLoggedin,setisLoggedin,verify } = useContext(AuthContext);


  useEffect(() => {
    verify()
      
  }, []);

  return isLoggedin ? children : <Navigate to={"/login"} /> ;
}
