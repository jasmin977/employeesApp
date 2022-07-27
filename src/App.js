import React from "react";

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "./screens/login";
import Dashboard from "./screens/dashboard";
import { AuthRoute } from "./components";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/dashboard"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route path="/*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
