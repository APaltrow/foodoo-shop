import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = "https://633577edea0de5318a142d98.mockapi.io/users";

export const fetchCheckUser = createAsyncThunk(
  "auth/fetchCheckUser",
  async (credentials) => {
    const { data } = await axios.get(`${URL}?email=${credentials.email}`);
    return data;
  }
);
export const fetchRegisterUser = createAsyncThunk(
  "auth/fetchRegisterUser",
  async (credentials) => {
    const { data } = await axios.post(URL, credentials);

    return data;
  }
);
export const fetchUpdateAddress = createAsyncThunk(
  "auth/fetchUpdateAddress",
  async (credentials) => {
    const { id, address } = credentials;
    const updatedAddress = { address: { ...address } };

    const { data } = await axios.put(`${URL}/${id}`, updatedAddress);

    return data;
  }
);
export const fetchEditProfile = createAsyncThunk(
  "auth/fetchEditProfile",
  async (credentials) => {
    const { id, profile } = credentials;

    const { data } = await axios.put(`${URL}/${id}`, profile);

    return data;
  }
);
export const fetchChangePassword = createAsyncThunk(
  "auth/fetchChangePassword",
  async (credentials) => {
    const { id, password } = credentials;

    const { data } = await axios.put(`${URL}/${id}`, password);

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
    },
    setLogOut: (state) => {
      state.user = {};
      state.isAuth = false;
      state.status = "";
      state.error = "";
    },
  },
  extraReducers: {
    [fetchCheckUser.pending]: (state) => {
      state.status = "pending";
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
    },
    [fetchRegisterUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
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
  },
});

export const getAuthState = (state) => state.authSlice;

export const { setUser, setUserCredentials, setRegister, setLogin, setLogOut } =
  authSlice.actions;

export default authSlice.reducer;
