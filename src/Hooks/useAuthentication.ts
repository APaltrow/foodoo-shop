import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { IUser } from "../@types";

import {
  getAuthState,
  setUser,
  fetchCheckUser,
  fetchRegisterUser,
  fetchUpdateAddress,
  fetchEditProfile,
  fetchChangePassword,
  useAppDispatch,
  useAppSelector,
  UpdateAddress,
  EditProfile,
  ChangePassword,
} from "../Redux";

export type Credentials = Record<string, string>;

type AuthFN = (arg: Credentials) => void;

interface IPayloadType {
  payload: IUser[];
}

export const useAuthentication = (type: string) => {
  const { user, status, error } = useAppSelector(getAuthState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formError, setError] = useState<string | boolean>(error);

  const login: AuthFN = async (credentials) => {
    //@ts-ignore
    const { payload }: IPayloadType = await dispatch(
      fetchCheckUser(credentials.email)
    );

    if (
      payload.length &&
      payload[0].password === credentials.password &&
      payload[0].email === credentials.email
    ) {
      localStorage.setItem("userId", `${payload[0].id}`);
      dispatch(setUser(payload[0]));
    } else {
      setError("Incorrect credentials");
    }
  };

  const register: AuthFN = async (credentials) => {
    //@ts-ignore
    const { payload }: IPayloadType = await dispatch(
      fetchCheckUser(credentials.email)
    );

    if (payload.length) {
      setError("Please try a different Email");
    } else {
      await dispatch(fetchRegisterUser(credentials));
      setTimeout(() => {
        navigate("/login");
      }, 500);
    }
  };

  const updateAddress: AuthFN = (credentials) => {
    dispatch(
      fetchUpdateAddress({
        id: user.id,
        address: { ...credentials },
      } as UpdateAddress)
    );
  };

  const editProfile: AuthFN = (credentials) => {
    dispatch(
      fetchEditProfile({ id: user.id, profile: credentials } as EditProfile)
    );
  };

  const changePassword: AuthFN = (credentials) => {
    if (
      credentials["old_password"] === user.password &&
      credentials["new_password"] === credentials["new_repeat_password"]
    ) {
      dispatch(
        fetchChangePassword({
          id: user.id,
          password: { password: credentials["new_password"] },
        } as ChangePassword)
      );
    } else {
      setError("Credentials do not match");
    }
  };

  const authenticate: AuthFN = (credentials) => {
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
