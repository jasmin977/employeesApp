import React from "react";

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "./screens/login";
import Dashboard from "./screens/dashboard";
import Employees from "./screens/Employees";
import SideBar from "./components/SideBar";

import { AuthRoute } from "./components";
import TimeSheets from "./screens/TimeSheets";
import Employee from "./screens/OneEmployee";
import AddEmployee from "./screens/AddEmployee";

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
        <Route
          exact
          path="/employees"
          element={
            <AuthRoute>
              <Employees />
            </AuthRoute>
          }
        />
        <Route
          exact
          path="/addemployee/"
          element={
            <AuthRoute>
              <AddEmployee />
            </AuthRoute>
          }
        />

        <Route
          exact
          path="/employee/:id"
          element={
            <AuthRoute>
              <Employee />
            </AuthRoute>
          }
        />
        <Route
          exact
          path="/timesheets"
          element={
            <AuthRoute>
              <TimeSheets />
            </AuthRoute>
          }
        />
        <Route path="/*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
