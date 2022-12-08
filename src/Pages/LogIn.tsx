import { FC } from "react";

import { Navigate } from "react-router-dom";
import { getAuthState, useAppSelector } from "../Redux";

import { CustomForm } from "../Components";

export const LogIn: FC = () => {
  const { isAuth } = useAppSelector(getAuthState);

  if (isAuth) {
    return <Navigate to="/" />;
  } else {
    return <CustomForm type={"login"} title={"login"} btn={"login"} />;
  }
};
