import React from "react";
import ReactDOM from "react-dom/client";
import "./style/tailwind.css";
import "./style/style.css";
import SocketProvider from "./context/socketProvider";
import AuthProvider from "./context/AuthContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
