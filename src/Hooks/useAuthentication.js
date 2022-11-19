import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getAuthState,
  setUser,
  fetchCheckUser,
  fetchRegisterUser,
  fetchUpdateAddress,
  fetchEditProfile,
  fetchChangePassword,
} from "../Redux/Slices/authSlice";

const useAuthentication = (type) => {
  const { user, status, error } = useSelector(getAuthState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formError, setError] = useState(error);

  const login = async (credentials) => {
    const { payload } = await dispatch(fetchCheckUser(credentials));
    if (
      payload.length &&
      payload[0].password === credentials.password &&
      payload[0].email === credentials.email
    ) {
      dispatch(setUser(payload[0]));
    } else {
      setError("Incorrect credentials");
    }
  };
  const register = async (credentials) => {
    const { payload } = await dispatch(fetchCheckUser(credentials));
    if (payload.length) {
      setError("Please try a different Email");
    } else {
      await dispatch(fetchRegisterUser(credentials));
      setTimeout(() => {
        navigate("/login");
      }, 500);
    }
  };
  const updateAddress = (credentials) => {
    dispatch(fetchUpdateAddress({ id: user.id, address: { ...credentials } }));
  };
  const editProfile = (credentials) => {
    dispatch(fetchEditProfile({ id: user.id, profile: credentials }));
  };

  const changePassword = (credentials) => {
    if (
      credentials["old_password"] === user.password &&
      credentials["new_password"] === credentials["new_repeat_password"]
    ) {
      dispatch(
        fetchChangePassword({
          id: user.id,
          password: { password: credentials["new_password"] },
        })
      );
    } else {
      setError("Credentials do not match");
    }
  };

  const authenticate = (credentials) => {
    switch (type) {
      case "registration":
        register(credentials);
        break;
      case "login":
        login(credentials);
        break;
      case "delivery_address":
        updateAddress(credentials);
        break;
      case "edit_profile":
        editProfile(credentials);
        break;
      case "change_password":
        changePassword(credentials);
        break;
      default:
        return null;
    }
  };

  useEffect(() => {
    setError(error);
  }, [error]);

  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 8000);
  }, [formError]);

  return {
    formError,
    authenticate,
    status,
  };
};

export default useAuthentication;
