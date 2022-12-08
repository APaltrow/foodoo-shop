import { FC, useEffect } from "react";

import { Navigate, Outlet } from "react-router-dom";

import {
  getAuthState,
  fetchLogedInUser,
  useAppDispatch,
  useAppSelector,
} from "../Redux";

export const AuthRequired: FC = () => {
  const dispatch = useAppDispatch();

  const { isAuth } = useAppSelector(getAuthState);

  useEffect(() => {
    const uid = localStorage.getItem("userId");
    if (uid && !isAuth) {
      dispatch(fetchLogedInUser(uid));
    }
  }, []);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
