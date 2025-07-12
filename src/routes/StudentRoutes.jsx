import React from "react";
import Loader from "../pages/Loader/Loader";
import useAuth from "../Hook/useAuth";
import useUserRole from "../Hook/useUserRole";

const StudentRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (loading || roleLoading) {
    return <Loader></Loader>;
  }

  if (!user || role !== "student") {
    return (
      <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    );
  }

  return children;
};

export default StudentRoutes;
