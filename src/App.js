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
import ToDo from "./screens/ToDo";
import Calender from "./screens/Calender";
import EditEmployee from "./screens/EditEmployee";

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
          path="/editemployee/:id"
          element={
            <AuthRoute>
              <EditEmployee />
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
        <Route
          exact
          path="/todo"
          element={
            <AuthRoute>
              <ToDo />
            </AuthRoute>
          }
        />
        <Route
          exact
          path="/calender"
          element={
            <AuthRoute>
              <Calender />
            </AuthRoute>
          }
        />
        <Route path="/*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
