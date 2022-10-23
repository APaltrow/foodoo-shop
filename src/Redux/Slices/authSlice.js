import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isAuth: false,
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
    },
  },
});

export const getAuthState = (state) => state.authSlice;

export const { setUser, setLogOut } = authSlice.actions;

export default authSlice.reducer;
