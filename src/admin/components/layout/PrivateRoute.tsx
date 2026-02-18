import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode; // ✅ safe
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  return token ? <>{children}</> : <Navigate to="/admin-login" replace />;
};

export default PrivateRoute;
