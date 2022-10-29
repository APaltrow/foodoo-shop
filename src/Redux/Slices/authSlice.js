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
    console.log(credentials);
    const { data } = await axios.put(`${URL}/${id}`, updatedAddress);

    return data;
  }
);

const initialState = {
  user: {},
  isAuth: false,

  userCredentials: {},
  serverData: [],
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
    setLogin: (state) => {
      if (
        state.serverData.length &&
        state.serverData[0].password === state.userCredentials.password &&
        state.serverData[0].email === state.userCredentials.email
      ) {
        state.user = state.serverData[0];
        state.isAuth = true;
      } else {
        state.error = "Incorrect credentials";
      }
    },
    setUserCredentials: (state, action) => {
      state.userCredentials = action.payload;
    },
    setLogOut: (state) => {
      state.user = {};
      state.isAuth = false;

      state.userCredentials = {};
      state.serverData = [];
      state.status = "";
      state.error = "";
    },
  },
  extraReducers: {
    [fetchCheckUser.pending]: (state) => {
      state.serverData = [];
      state.status = "pending";
    },
    [fetchCheckUser.fulfilled]: (state, action) => {
      state.serverData = action.payload;
      state.status = "success";
    },
    [fetchCheckUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.serverData = [];
      state.status = "error";
    },
    [fetchRegisterUser.pending]: (state) => {
      state.status = "pending";
    },
    [fetchRegisterUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;

      state.userCredentials = {};
      state.serverData = [];
      state.status = "success";
      state.error = "";
    },
    [fetchRegisterUser.rejected]: (state, action) => {
      state.user = {};
      state.isAuth = false;

      state.userCredentials = {};
      state.serverData = [];
      state.status = "error";
      state.error = action.error.message;
    },
    [fetchUpdateAddress.pending]: (state) => {
      state.status = "pending";
    },
    [fetchUpdateAddress.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.userCredentials = {};
      state.serverData = [];

      state.status = "success";
      state.error = "";
    },
    [fetchUpdateAddress.rejected]: (state, action) => {
      state.userCredentials = {};
      state.serverData = [];

      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export const getAuthState = (state) => state.authSlice;

export const {
  setUser,
  setUserCredentials,

  setLogin,
  setLogOut,
} = authSlice.actions;

export default authSlice.reducer;
