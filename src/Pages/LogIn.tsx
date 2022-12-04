import React, { FC } from "react";

import { CustomForm } from "../Components";

import { Navigate } from "react-router-dom";
import { getAuthState } from "../Redux/Slices/authSlice";
import { useAppSelector } from "../Hooks/storeHooks";

export const LogIn: FC = () => {
  const { isAuth } = useAppSelector(getAuthState);

  if (isAuth) {
    return <Navigate to="/" />;
  } else {
    return <CustomForm type={"login"} title={"login"} btn={"login"} />;
  }
};
