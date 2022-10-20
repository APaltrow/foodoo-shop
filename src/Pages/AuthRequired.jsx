import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuthState } from "../Redux/Slices/authSlice";
import { useSelector } from "react-redux";

const AuthRequired = () => {
  const { isAuth } = useSelector(getAuthState);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AuthRequired;
