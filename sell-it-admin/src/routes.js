import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, isLoggedIn, ...props }) => {
  return isLoggedIn ? (
    <Outlet {...props} />
  ) : (
    <Navigate to={{ pathname: "/login", state: { from: props.path } }} />
  );
};

export default PrivateRoute;
