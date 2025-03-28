import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
interface RouteProps {
  element: ReactNode;
}

// this route is for all logged in user
export const ProtectedRouteHome: React.FC<RouteProps> = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to={"/sign-in"}></Navigate>;
};

// this route is for the user if he is logged in then show profile
export const ProtectedRoute: React.FC<RouteProps> = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to={"/user/profile"}></Navigate> : element;
};
