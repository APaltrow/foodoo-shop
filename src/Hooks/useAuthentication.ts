import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { IUser } from "../@types";
import { FormTypesList } from "../constants/FormTypes";

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

interface ILoginCredentials {
  email: string;
  password: string;
}
interface IRegisterCredentials extends ILoginCredentials {
  firstname: string;
  lastname: string;
  phone: string;
}
interface IUpdateAddressCredentials {
  city: string;
  street: string;
  "house-number": string;
}
interface IEditProfileCredentials {
  firstname: string;
  lastname: string;
  phone: string;
}
interface IChangePasswordCredentials {
  old_password: string;
  new_password: string;
  new_repeat_password: string;
}

export type Credentials =
  | ILoginCredentials
  | IRegisterCredentials
  | IUpdateAddressCredentials
  | IEditProfileCredentials
  | IChangePasswordCredentials;

interface IPayloadType {
  payload: IUser[];
}

export const useAuthentication = (type: FormTypesList) => {
  const { user, status, error } = useAppSelector(getAuthState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formError, setError] = useState<string | boolean>(error);

  const login = async (credentials: ILoginCredentials) => {
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

  const register = async (credentials: IRegisterCredentials) => {
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

  const updateAddress = (credentials: IUpdateAddressCredentials) => {
    dispatch(
      fetchUpdateAddress({
        id: user.id,
        address: { ...credentials },
      } as UpdateAddress)
    );
  };

  const editProfile = (credentials: IEditProfileCredentials) => {
    dispatch(
      fetchEditProfile({ id: user.id, profile: credentials } as EditProfile)
    );
  };

  const changePassword = (credentials: IChangePasswordCredentials) => {
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

  const authenticate = (credentials: Credentials) => {
    switch (type) {
      case FormTypesList.REGISTRATION:
        register(credentials as IRegisterCredentials);
        break;
      case FormTypesList.LOGIN:
        login(credentials as ILoginCredentials);
        break;
      case FormTypesList.DELIVERY_ADDRESS:
        updateAddress(credentials as IUpdateAddressCredentials);
        break;
      case FormTypesList.EDIT_PROFILE:
        editProfile(credentials as IEditProfileCredentials);
        break;
      case FormTypesList.CHANGE_PASSWORD:
        changePassword(credentials as IChangePasswordCredentials);
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
