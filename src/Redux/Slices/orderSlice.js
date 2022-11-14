import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ORDERS_URL } from "../../constants/Urls";

export const fetchOrdersList = createAsyncThunk(
  "order/fetchOrdersList",
  async (id) => {
    const { data } = await axios.get(`${ORDERS_URL}?uid=${id}`);
    return data;
  }
);
export const fetchDeliveredOrder = createAsyncThunk(
  "order/fetchDeliveredOrder",
  async (order) => {
    const { id } = order;
    const { data } = await axios.put(`${ORDERS_URL}/${id}`, order);
    return data;
  }
);

const initialState = {
  pendingOrder: null,
  ordersList: [],

  status: "",
  error: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setStatus: (state) => {
      state.status = "";
    },
  },
  extraReducers: {
    [fetchOrdersList.pending]: (state) => {
      state.status = "pending";
      state.error = "";
    },
    [fetchOrdersList.fulfilled]: (state, action) => {
      const pendingOrder = action.payload.filter(
        (order) => order.orderStatus === "pending"
      );
      if (pendingOrder.length) {
        state.pendingOrder = pendingOrder[0];
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
      state.status = "pending";
      state.error = "";
    },
    [fetchDeliveredOrder.fulfilled]: (state, action) => {
      state.ordersList = [
        ...state.ordersList.filter(
          (order) => order.orderId !== action.payload.orderId
        ),
        action.payload,
      ];
      state.pendingOrder = null;
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

export const { setStatus } = orderSlice.actions;

export default orderSlice.reducer;
