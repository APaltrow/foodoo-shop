import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = "https://633577edea0de5318a142d98.mockapi.io/orders";

export const fetchOrder = createAsyncThunk("auth/fetchOrder", async (order) => {
  const { data } = await axios.post(URL, order);
  return data;
});
export const fetchOrdersList = createAsyncThunk(
  "auth/fetchOrdersList",
  async (id) => {
    const { data } = await axios.get(`${URL}?uid=${id}`);
    return data;
  }
);
export const fetchDeliveredOrder = createAsyncThunk(
  "auth/fetchDeliveredOrder",
  async (order) => {
    const { id } = order;
    const { data } = await axios.put(`${URL}/${id}`, order);
    return data;
  }
);

const initialState = {
  order: {},
  ordersList: [],

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
    setStatus: (state) => {
      state.status = "";
    },
  },
  extraReducers: {
    [fetchOrder.pending]: (state) => {
      state.status = "pending";
      state.error = "";
    },
    [fetchOrder.fulfilled]: (state) => {
      state.order = {};
      state.status = "success";
    },
    [fetchOrder.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = "error";
    },
    [fetchOrdersList.pending]: (state) => {
      state.status = "pending";
      state.error = "";
    },
    [fetchOrdersList.fulfilled]: (state, action) => {
      if (action.payload.length) {
        state.order = action.payload.filter(
          (order) => order.orderStatus === "pending"
        )[0];
      }
      state.ordersList = action.payload;
      state.status = "success";
      state.error = "";
    },
    [fetchOrdersList.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = "error";
    },
    [fetchDeliveredOrder.pending]: (state) => {
      state.order = {};
      state.status = "pending";
      state.error = "";
    },
    [fetchDeliveredOrder.fulfilled]: (state, action) => {
      state.order = {};
      state.ordersList = [
        ...state.ordersList.filter(
          (order) => order.orderId !== action.payload.orderId
        ),
        action.payload,
      ];
      state.status = "success";
      state.error = "";
    },
    [fetchDeliveredOrder.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = "error";
    },
  },
});

export const getOrderState = (state) => state.orderSlice;

export const { setOrder, setStatus, setCancelOrder } = orderSlice.actions;

export default orderSlice.reducer;
