import React from "react";
import CustomForm from "../Components/CustomForm";
import { Navigate } from "react-router-dom";
import { getAuthState, fetchLogedInUser } from "../Redux/Slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function LogIn() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(getAuthState);

  useEffect(() => {
    const uid = localStorage.getItem("userId");
    if (uid && !isAuth) {
      dispatch(fetchLogedInUser(uid));
    }
  }, []);

  if (isAuth) {
    return <Navigate to="/" />;
  } else {
    return (
      <>
        <CustomForm type={"login"} title={"login"} btn={"login"} />
      </>
    );
  }
}

export default LogIn;
