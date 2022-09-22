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

import { AuthRoute } from "./components";
import TimeSheets from "./screens/TimeSheets";
import TimeSheetEmployee from "./screens/TimeSheetEmployee";
import Employee from "./screens/OneEmployee";
import AddEmployee from "./screens/AddEmployee";
import Tasks from "./screens/Tasks";
import Calender from "./screens/Calender";
import EditEmployee from "./screens/EditEmployee";
import AuthProvider from "./context/AuthContext";
import SocketProvider from "./context/socketProvider";

function App() {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
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
              path="/timesheet/:id"
              element={
                <AuthRoute>
                  <TimeSheetEmployee />
                </AuthRoute>
              }
            />

            <Route
              exact
              path="/tasks"
              element={
                <AuthRoute>
                  <Tasks />
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
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
