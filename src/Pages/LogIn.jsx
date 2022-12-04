import React from "react";

import { CustomForm } from "../Components";

import { Navigate } from "react-router-dom";
import { getAuthState } from "../Redux/Slices/authSlice";
import { useSelector } from "react-redux";

export const LogIn = () => {
  const { isAuth } = useSelector(getAuthState);

  if (isAuth) {
    return <Navigate to="/" />;
  } else {
    return <CustomForm type={"login"} title={"login"} btn={"login"} />;
  }
};