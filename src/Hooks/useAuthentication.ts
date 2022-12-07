import { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "./storeHooks";
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

type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phone: string;
};
export type UpdateAddressCredentials = {
  city: string;
  street: string;
  "house-number": string;
};
export type EditProfileCredentials = {
  firstname: string;
  lastname: string;
  phone: string;
};
export type ChangePasswordCredentials = {
  old_password: string;
  new_password: string;
  new_repeat_password: string;
};

type LoginFN = (credentials: LoginCredentials) => void;
type RegisterFN = (credentials: RegisterCredentials) => void;
type UpdateAddressFN = (credentials: UpdateAddressCredentials) => void;
type EditProfileFN = (credentials: EditProfileCredentials) => void;
type ChangePasswordFN = (credentials: ChangePasswordCredentials) => void;

//@ts-ignore

const useAuthentication = (type: string) => {
  const { user, status, error } = useAppSelector(getAuthState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formError, setError] = useState(error);

  const login: LoginFN = async (credentials) => {
    const { payload } = await dispatch(fetchCheckUser(credentials.email));

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

  const register: RegisterFN = async (credentials) => {
    const { payload } = await dispatch(fetchCheckUser(credentials.email));
    if (payload.length) {
      setError("Please try a different Email");
    } else {
      await dispatch(fetchRegisterUser(credentials));
      setTimeout(() => {
        navigate("/login");
      }, 500);
    }
  };

  const updateAddress: UpdateAddressFN = (credentials) => {
    dispatch(fetchUpdateAddress({ id: user.id, address: { ...credentials } }));
  };

  const editProfile: EditProfileFN = (credentials) => {
    dispatch(fetchEditProfile({ id: user.id, profile: credentials }));
  };

  const changePassword: ChangePasswordFN = (credentials) => {
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
    status,

    authenticate,
  };
};

export default useAuthentication;
