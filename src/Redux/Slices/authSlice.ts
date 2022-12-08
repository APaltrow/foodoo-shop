import axios from "axios";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { USERS_URL } from "../../constants/Urls";
import { RootState } from "../store";

import {
  EditProfileCredentials,
  RegisterCredentials,
  UpdateAddressCredentials,
} from "../../Hooks/useAuthentication";
import { IState, IUser, StatusList } from "../../@types";

export const fetchCheckUser = createAsyncThunk<IUser, string>(
  "auth/fetchCheckUser",
  async (credentials) => {
    const { data } = await axios.get(`${USERS_URL}?email=${credentials}`);

    return data;
  }
);
export const fetchLogedInUser = createAsyncThunk<IUser, string>(
  "auth/fetchLogedInUser",
  async (uid) => {
    const { data }: { data: IUser[] } = await axios.get(
      `${USERS_URL}?id=${uid}`
    );
    return data[0];
  }
);
export const fetchRegisterUser = createAsyncThunk<IUser, RegisterCredentials>(
  "auth/fetchRegisterUser",
  async (credentials) => {
    const { data }: { data: IUser } = await axios.post(USERS_URL, credentials);

    return data;
  }
);
export const fetchUpdateAddress = createAsyncThunk<IUser, UpdateAddress>(
  "auth/fetchUpdateAddress",
  async (credentials) => {
    const { id, address } = credentials;
    const updatedAddress = { address: { ...address } };

    const { data }: { data: IUser } = await axios.put(
      `${USERS_URL}/${id}`,
      updatedAddress
    );

    return data;
  }
);
export const fetchEditProfile = createAsyncThunk<IUser, EditProfile>(
  "auth/fetchEditProfile",
  async (credentials) => {
    const { id, profile } = credentials;

    const { data }: { data: IUser } = await axios.put(
      `${USERS_URL}/${id}`,
      profile
    );

    return data;
  }
);
export const fetchChangePassword = createAsyncThunk<IUser, ChangePassword>(
  "auth/fetchChangePassword",
  async (credentials) => {
    const { id, password } = credentials;

    const { data }: { data: IUser } = await axios.put(
      `${USERS_URL}/${id}`,
      password
    );

    return data;
  }
);

// refactor-fix
type ChangePassword = {
  id: string;
  password: {
    password: string;
  };
};

type EditProfile = {
  id: string;
  profile: EditProfileCredentials;
};

type UpdateAddress = {
  id: string;
  address: UpdateAddressCredentials;
};

interface IAuthState extends IState {
  user: IUser;
  isAuth: boolean;
}

const initialState: IAuthState = {
  user: {
    id: null,
    uid: null,
    email: null,
    password: null,
    firstname: null,
    lastname: null,
    phone: null,

    address: null,
  },
  isAuth: false,

  status: StatusList.IDLE,
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuth = true;
      //refactor-fix
      localStorage.setItem("userId", `${action.payload.id}`);
    },
    setLogOut: (state) => {
      //refactor-fix
      localStorage.clear();
      state.user = {
        id: null,
        uid: null,
        email: null,
        password: null,
        firstname: null,
        lastname: null,
        phone: null,

        address: null,
      };
      state.isAuth = false;
      state.status = StatusList.IDLE;
      state.error = "";
    },
    setAuthStatus: (state) => {
      state.status = StatusList.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCheckUser.pending, (state) => {
        state.status = StatusList.PENDING;
        state.error = "";
      })
      .addCase(fetchCheckUser.fulfilled, (state) => {
        state.status = StatusList.SUCCESS;
      })
      .addCase(fetchCheckUser.rejected, (state, action) => {
        state.error = action.error.message || "Error";
        state.status = StatusList.ERROR;
      })
      .addCase(fetchRegisterUser.pending, (state) => {
        state.status = StatusList.PENDING;
        state.error = "";
      })
      .addCase(fetchRegisterUser.fulfilled, (state) => {
        state.status = StatusList.SUCCESS;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        //refactor-fix
        //@ts-ignore
        state.user = {};
        state.isAuth = false;
        state.status = StatusList.ERROR;
        state.error = action.error.message || "Error";
      })
      .addCase(fetchUpdateAddress.pending, (state) => {
        state.status = StatusList.PENDING;
        state.error = "";
      })
      .addCase(fetchUpdateAddress.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = StatusList.SUCCESS;
      })
      .addCase(fetchUpdateAddress.rejected, (state, action) => {
        state.status = StatusList.ERROR;
        state.error = action.error.message || "Error";
      })
      .addCase(fetchEditProfile.pending, (state) => {
        state.status = StatusList.PENDING;
        state.error = "";
      })
      .addCase(fetchEditProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = StatusList.SUCCESS;
      })
      .addCase(fetchEditProfile.rejected, (state, action) => {
        state.status = StatusList.ERROR;
        state.error = action.error.message || "Error";
      })
      .addCase(fetchChangePassword.pending, (state) => {
        state.status = StatusList.PENDING;
        state.error = "";
      })
      .addCase(fetchChangePassword.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = StatusList.SUCCESS;
      })
      .addCase(fetchChangePassword.rejected, (state, action) => {
        state.status = StatusList.ERROR;
        state.error = action.error.message || "Error";
      })
      .addCase(fetchLogedInUser.pending, (state) => {
        state.status = StatusList.PENDING;
        state.error = "";
      })
      .addCase(fetchLogedInUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.status = StatusList.SUCCESS;
      })
      .addCase(fetchLogedInUser.rejected, (state, action) => {
        state.status = StatusList.ERROR;
        state.error = action.error.message || "Error";
      });
  },
});

export const getAuthState = (state: RootState) => state.authSlice;

export const { setUser, setAuthStatus, setLogOut } = authSlice.actions;

export default authSlice.reducer;
