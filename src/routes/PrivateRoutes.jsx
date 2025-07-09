import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hook/useAuth";
import Loader from "../pages/Loader/Loader";

const PrivateRoutes = ({ children }) => {
  const { loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader></Loader>;
  }

  if (user) {
    return children;
  } else {
    return <Navigate state={location.pathname} to={"/login"}></Navigate>;
  }
};

export default PrivateRoutes;
