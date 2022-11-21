import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { USERS_URL } from "../../constants/Urls";

export const fetchCheckUser = createAsyncThunk(
  "auth/fetchCheckUser",
  async (credentials) => {
    const { data } = await axios.get(`${USERS_URL}?email=${credentials.email}`);
    return data;
  }
);
export const fetchLogedInUser = createAsyncThunk(
  "auth/fetchLogedInUser",
  async (uid) => {
    const { data } = await axios.get(`${USERS_URL}?id=${uid}`);
    return data;
  }
);
export const fetchRegisterUser = createAsyncThunk(
  "auth/fetchRegisterUser",
  async (credentials) => {
    const { data } = await axios.post(USERS_URL, credentials);

    return data;
  }
);
export const fetchUpdateAddress = createAsyncThunk(
  "auth/fetchUpdateAddress",
  async (credentials) => {
    const { id, address } = credentials;
    const updatedAddress = { address: { ...address } };

    const { data } = await axios.put(`${USERS_URL}/${id}`, updatedAddress);

    return data;
  }
);
export const fetchEditProfile = createAsyncThunk(
  "auth/fetchEditProfile",
  async (credentials) => {
    const { id, profile } = credentials;

    const { data } = await axios.put(`${USERS_URL}/${id}`, profile);

    return data;
  }
);
export const fetchChangePassword = createAsyncThunk(
  "auth/fetchChangePassword",
  async (credentials) => {
    const { id, password } = credentials;

    const { data } = await axios.put(`${USERS_URL}/${id}`, password);

    return data;
  }
);

const initialState = {
  user: {},
  isAuth: false,

  status: "",
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      localStorage.setItem("userId", action.payload.id);
    },
    setLogOut: (state) => {
      localStorage.clear();
      state.user = {};
      state.isAuth = false;
      state.status = "";
      state.error = "";
    },
    setAuthStatus: (state) => {
      state.status = "";
    },
  },
  extraReducers: {
    [fetchCheckUser.pending]: (state) => {
      state.status = "pending";
      state.error = "";
    },
    [fetchCheckUser.fulfilled]: (state) => {
      state.status = "success";
    },
    [fetchCheckUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = "error";
    },
    [fetchRegisterUser.pending]: (state) => {
      state.status = "pending";
      state.error = "";
    },
    [fetchRegisterUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.error = "";
    },
    [fetchRegisterUser.rejected]: (state, action) => {
      state.user = {};
      state.isAuth = false;
      state.status = "error";
      state.error = action.error.message;
    },
    [fetchUpdateAddress.pending]: (state) => {
      state.status = "pending";
      state.error = "";
    },
    [fetchUpdateAddress.fulfilled]: (state, action) => {
      state.user = action.payload;

      state.status = "success";
      state.error = "";
    },
    [fetchUpdateAddress.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [fetchEditProfile.pending]: (state) => {
      state.status = "pending";
      state.error = "";
    },
    [fetchEditProfile.fulfilled]: (state, action) => {
      state.user = action.payload;

      state.status = "success";
      state.error = "";
    },
    [fetchEditProfile.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [fetchChangePassword.pending]: (state) => {
      state.status = "pending";
      state.error = "";
    },
    [fetchChangePassword.fulfilled]: (state, action) => {
      state.user = action.payload;

      state.status = "success";
      state.error = "";
    },
    [fetchChangePassword.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [fetchLogedInUser.pending]: (state) => {
      state.status = "pending";
      state.error = "";
    },
    [fetchLogedInUser.fulfilled]: (state, action) => {
      state.user = action.payload[0];
      state.isAuth = true;

      state.status = "";
      state.error = "";
    },
    [fetchLogedInUser.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export const getAuthState = (state) => state.authSlice;

export const {
  setUser,
  setAuthStatus,
  setUserCredentials,
  setRegister,
  setLogin,
  setLogOut,
} = authSlice.actions;

export default authSlice.reducer;
