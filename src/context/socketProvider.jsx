import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = React.createContext({
  socket: {},
});


export default function SocketProvider({ children }) {
  //const { adminToken,socketId, setSocketId } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const ENDPOINT = "http://localhost:5000"

const adminToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYzNTEzMjgzfQ.ORqxQw9ZcX8Kta-PXlojAWbUwbfjn0_tXsic0PsB7p0"
  useEffect(() => {
   // console.log(adminToken)
    if (adminToken && !socket) {
      console.log("admin socket connection is ON");
      const newSocket = io(ENDPOINT, { query: { token: adminToken } });
      newSocket.on("TIMESHETT_LAST_UPDATE", ({adminSocket}) => {
        console.log("i got mysocketID" , adminSocket);
      
      });
      setSocket(newSocket);
      return () => {
        console.log("socket connection is OFF");
        newSocket.close();
        setSocket(null);
      };
    }
  }, [adminToken]);



  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
