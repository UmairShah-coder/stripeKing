// src/routes/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    // Token nahi hai → login page redirect
    return <Navigate to="/admin-login" replace />;
  }

  // Token hai → requested page show
  return children;
};

export default ProtectedRoute;
