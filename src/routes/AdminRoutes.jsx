import React, { Children } from "react";
import { Navigate } from "react-router";
import useAuth from "../Hook/useAuth";
import useUserRole from "../Hook/useUserRole";
import Loader from "../pages/Loader/Loader";

const AdminRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (loading || roleLoading) {
    return <Loader></Loader>;
  }

  if (!user || role !== "admin") {
    return (
      <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    );
  }

  return children;
};

export default AdminRoutes;
