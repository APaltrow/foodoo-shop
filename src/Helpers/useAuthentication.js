import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAuthState,
  setLogin,
  setUserCredentials,
  fetchCheckUser,
  fetchRegisterUser,
  fetchUpdateAddress,
} from "../Redux/Slices/authSlice";

const useAuthentication = (type) => {
  const { user, serverData, status, error } = useSelector(getAuthState);
  const dispatch = useDispatch();

  const [formError, setError] = useState(error);

  const updateAddress = async (credentials) => {
    const response = await axios.put(
      `https://633577edea0de5318a142d98.mockapi.io/users/${user.id}`,
      credentials
    );
    console.log(response);
  };

  const authenticate = async (credentials) => {
    await dispatch(setUserCredentials(credentials));
    const { payload } = await dispatch(fetchCheckUser(credentials));

    switch (type) {
      case "registration":
        if (payload.length) {
          setError("Please try a different Email");
        } else {
          dispatch(fetchRegisterUser(credentials));
        }
        break;
      case "login":
        dispatch(setLogin());
        break;
      case "delivery_address":
        dispatch(
          fetchUpdateAddress({ id: user.id, address: { ...credentials } })
        );
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
