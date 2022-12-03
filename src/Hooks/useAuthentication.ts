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

type LoginCredentials = {
  email: string;
  password: string;
};

interface RegisterCredentials extends LoginCredentials {
  firstname: string;
  lastname: string;
  phone: string;
}
type UpdateAddressCredentials = {
  city: string;
  street: string;
  "house-number": string;
};
type EditProfileCredentials = {
  firstname: string;
  lastname: string;
  phone: string;
};
type ChangePasswordCredentials = {
  old_password: string;
  new_password: string;
  new_repeat_password: string;
};

type LoginFN = (credentials: LoginCredentials) => void;
type RegisterFN = (credentials: RegisterCredentials) => void;
type UpdateAddressFN = (credentials: UpdateAddressCredentials) => void;
type EditProfileFN = (credentials: EditProfileCredentials) => void;
type ChangePasswordFN = (credentials: ChangePasswordCredentials) => void;

type AuthenticateFN = (credentials: any) => void;

const useAuthentication = (type: string) => {
  const { user, status, error } = useSelector(getAuthState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formError, setError] = useState(error);

  const login: LoginFN = async (credentials) => {
    //@ts-ignore
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

  const register: RegisterFN = async (credentials) => {
    //@ts-ignore
    const { payload } = await dispatch(fetchCheckUser(credentials));
    if (payload.length) {
      setError("Please try a different Email");
    } else {
      //@ts-ignore
      await dispatch(fetchRegisterUser(credentials));
      setTimeout(() => {
        navigate("/login");
      }, 500);
    }
  };

  const updateAddress: UpdateAddressFN = (credentials) => {
    //@ts-ignore
    dispatch(fetchUpdateAddress({ id: user.id, address: { ...credentials } }));
  };

  const editProfile: EditProfileFN = (credentials) => {
    //@ts-ignore
    dispatch(fetchEditProfile({ id: user.id, profile: credentials }));
  };

  const changePassword: ChangePasswordFN = (credentials) => {
    if (
      credentials["old_password"] === user.password &&
      credentials["new_password"] === credentials["new_repeat_password"]
    ) {
      dispatch(
        //@ts-ignore
        fetchChangePassword({
          id: user.id,
          password: { password: credentials["new_password"] },
        })
      );
    } else {
      setError("Credentials do not match");
    }
  };

  const authenticate: AuthenticateFN = (credentials) => {
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
