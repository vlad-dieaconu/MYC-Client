import React, { Component } from "react";
import "./App.css";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import WorkingDays from "./pages/WorkingDays";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import WorkingDayEmployee from "./pages/WorkingDayEmployee";
import ProjectEmployee from "./pages/ProjectEmployee";
import LeaveRequestsPage from "./pages/LeaveRequestsPage";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/workingdays" element={<WorkingDays />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgotPassword" element={<ForgotPassword/>}/>
          <Route path="/changePassword/:token" element={<ChangePassword/>}/>
          {/**Employee**/}
          <Route path="/clockingWorkingDay" element={<WorkingDayEmployee/>}/>
          <Route path="/projectEmployee" element={<ProjectEmployee/>}/>
          <Route path="/requests" element={<LeaveRequestsPage/>}/>
        </Routes>
      </Router>
    );
  }
}

export default App;
