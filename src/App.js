import React, { Component } from "react";
import "./App.css";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import WorkingDays from "./pages/WorkingDays";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";

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
        </Routes>
      </Router>
    );
  }
}

export default App;
