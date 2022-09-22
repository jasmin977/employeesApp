import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  loggedIn: {},
  socketId: {},
  adminToken: {},
});

export default function AuthProvider({ children }) {
  const [adminToken, setadminToken] = useState(
    document.cookie.split("=")[1] || null
  );
  const [loggedIn, setLoggedIn] = useState(false);
  const [socketId, setSocketId] = useState(null);
  const navigate = useNavigate();

  const login = async (values) => {
    try {
      const res = await axios.post(`/api/auth/login`, { ...values });
      setLoggedIn(true);
      setadminToken(document.cookie.split("=")[1]);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const res = axios.post("/api/admin/logout");
      setadminToken(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        socketId,
        setSocketId,
        adminToken,
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

//by the context provider we can pass any value to any screen of our app
