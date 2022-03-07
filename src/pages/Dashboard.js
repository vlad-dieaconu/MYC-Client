import React, { useState } from "react";
import AuthService from "../services/AuthService";
import NavbarAdmin from "../components/NavbarAdmin";

const Dashboard = () => {
  const [role, setRole] = useState(() => {
    if (AuthService.getCurrentUser()) {
      const currentUser = AuthService.getCurrentUser();
      const roleFromLocalStorage = currentUser.roles[0];
      return roleFromLocalStorage;
    }
    return "";
  });

  if (role === "ROLE_ADMIN") {
    return (
      <div>
        <NavbarAdmin></NavbarAdmin>
      </div>
    );
  }
};
export default Dashboard;
