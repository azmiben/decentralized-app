import { Navigate, Outlet } from "react-router-dom";
import React from "react";

const ProtectedRoutes = () => {
  const data1 = localStorage.getItem("isloggedin");
  // const data2 = localStorage.getItem("loggedas");

  return !data1 ? <Navigate to={"/"} /> : <Outlet />;
};

export default ProtectedRoutes;
