import React, { use } from "react";
import { AuthContext } from "../provider/AuthContext";

const useAuth = () => {
  const userInfo = use(AuthContext);

  return userInfo;
};

export default useAuth;
