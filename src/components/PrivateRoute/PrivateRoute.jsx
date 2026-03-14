import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userEmail = localStorage.getItem("userEmail");

  if (!userEmail) {
    // Redirect unauthenticated users to the login page
    return <Navigate to="/login" replace />;
  }

  // Render the protected component
  return children;
};

export default PrivateRoute;
