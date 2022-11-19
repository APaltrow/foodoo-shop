import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { getAuthState, fetchLogedInUser } from "../Redux/Slices/authSlice";

const AuthRequired = () => {
  const dispatch = useDispatch();

  const { isAuth } = useSelector(getAuthState);

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

export default AuthRequired;
