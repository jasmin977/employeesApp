import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  verify: () => {},
  isLoggedin: {},
  adminToken: {},
});

export default function AuthProvider({ children }) {
  const [adminToken, setadminToken] = useState(
    document.cookie.split("=")[1] || null
  );
  const [isLoggedin, setisLoggedin] = useState(false);
  const navigate = useNavigate();

  const login = async (values) => {
    try {
      const res = await axios.post(`/api/auth/login`, { ...values });
      setisLoggedin(true);
      setadminToken(document.cookie.split("=")[1]);
      navigate("/dashboard", { replace: true });

    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const res = axios.post("/api/admin/logout");
      setadminToken(null);
      setisLoggedin(false)
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const verify = async () => {
    try {
      const res = await axios.post(`/api/auth/verify`);
      if(res.data.status ){
        navigate("/dashboard"); //which is dashhbord
      }
      else {
        setisLoggedin(false);
       
      }
     
    } catch (error) {
      console.log(error);
     
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        verify,
        adminToken,
        isLoggedin,
        setisLoggedin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

//by the context provider we can pass any value to any screen of our app
