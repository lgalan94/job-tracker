// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Render children only if authenticated
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
