import React, { FC } from "react";

import { CustomForm } from "../Components";

import { Navigate } from "react-router-dom";
import { getAuthState } from "../Redux/Slices/authSlice";

import { useAppSelector } from "../Hooks/storeHooks";

const Registration: FC = () => {
  const { isAuth } = useAppSelector(getAuthState);

  if (isAuth) return <Navigate to="/" />;
  return (
    <CustomForm type={"registration"} title={"Registration"} btn={"Register"} />
  );
};

export default Registration;
