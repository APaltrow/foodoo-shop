import React from "react";

import { CustomForm } from "../Components";

import { Navigate } from "react-router-dom";
import { getAuthState } from "../Redux/Slices/authSlice";
import { useSelector } from "react-redux";

const Registration = () => {
  const { isAuth } = useSelector(getAuthState);

  if (isAuth) return <Navigate to="/" />;
  return (
    <CustomForm type={"registration"} title={"Registration"} btn={"Register"} />
  );
};

export default Registration;
