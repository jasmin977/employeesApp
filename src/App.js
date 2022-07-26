import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./screens/login";
import Dashboard from "./screens/dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
