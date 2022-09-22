import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";


export const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  loggedIn: {},
  socketId: {},
 adminToken: {},
 
});

export default function AuthProvider  ({ children })  {

  const [adminToken, setadminToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [socketId, setSocketId] = useState(null);
  const [cookies, removeCookie] = useCookies(["token"]);

  const login = (values) => {
    try {
     
       axios
        .post(`/api/auth/login`, { ...values })
        .then((res) => {
       
          setadminToken(res.data.token);
          setLoggedIn(true)
        
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
   
  };

  const logout = async () => {
    try {
    
      setadminToken(null);
      removeCookie("token");
    //  navigate("/login");
    
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        socketId, setSocketId,
        adminToken,loggedIn,setLoggedIn
       
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//by the context provider we can pass any value to any screen of our app
