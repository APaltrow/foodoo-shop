import { FC } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector, getAuthState } from "../Redux/";

import { CustomForm } from "../Components";

const Registration: FC = () => {
  const { isAuth } = useAppSelector(getAuthState);

  if (isAuth) return <Navigate to="/" />;
  return (
    <CustomForm type={"registration"} title={"Registration"} btn={"Register"} />
  );
};

export default Registration;
