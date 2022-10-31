import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = "https://633577edea0de5318a142d98.mockapi.io/orders";

export const fetchOrder = createAsyncThunk("auth/fetchOrder", async (order) => {
  const { data } = await axios.post(URL, order);
  return data;
});

const initialState = {
  order: {},

  status: "",
  error: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = { ...action.payload };
      state.status = "";
      state.error = "";
    },
    setCancelOrder: (state) => {
      state.order = {};
      state.status = "";
      state.error = "";
    },
  },
  extraReducers: {
    [fetchOrder.pending]: (state) => {
      state.status = "pending";
      state.error = "";
    },
    [fetchOrder.fulfilled]: (state) => {
      state.status = "success";
    },
    [fetchOrder.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = "error";
    },
  },
});

export const getOrderState = (state) => state.orderSlice;

export const { setOrder, setCancelOrder } = orderSlice.actions;

export default orderSlice.reducer;
