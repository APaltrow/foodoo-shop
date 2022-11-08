import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { getAuthState, fetchLogedInUser } from "../Redux/Slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const AuthRequired = () => {
  const { isAuth } = useSelector(getAuthState);

  const dispatch = useDispatch();
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
