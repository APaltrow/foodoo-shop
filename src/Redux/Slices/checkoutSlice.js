import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ORDERS_URL } from "../../constants/Urls";

export const fetchOrder = createAsyncThunk(
  "checkout/fetchOrder",
  async (order) => {
    const { data } = await axios.post(ORDERS_URL, order);
    return data;
  }
);

const initialState = {
  order: {
    uid: null,
    orderId: null,
    recipient: null,
    deliveryAddress: null,
    paymentType: "cash",
    ordercheck: null,
    totalCost: null,
    orderDate: null,
    paymentStatus: null,
    orderStatus: "pending",
    preorder: null,
  },

  status: "",
  error: "",
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = { ...action.payload };
      state.status = "";
      state.error = "";
    },
    setPaymentType: (state, action) => {
      state.order.paymentType = action.payload;
    },
    setPaymentStatus: (state, action) => {
      state.order.paymentStatus = action.payload;
    },
    setPreOrder: (state, action) => {
      state.order.preorder = action.payload;
      if (action.payload) {
        state.order.orderStatus = "preorder";
      } else {
        state.order.orderStatus = "pending";
      }
    },
    setCancelOrder: (state) => {
      state.order = {
        uid: null,
        orderId: null,
        recipient: null,
        deliveryAddress: null,
        paymentType: "cash",
        ordercheck: null,
        totalCost: null,
        orderDate: null,
        paymentStatus: null,
        orderStatus: "pending",
        preorder: null,
      };
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
      state.order = {
        uid: null,
        orderId: null,
        recipient: null,
        deliveryAddress: null,
        paymentType: "cash",
        ordercheck: null,
        totalCost: null,
        orderDate: null,
        paymentStatus: null,
        orderStatus: "pending",
        preorder: null,
      };
      state.status = "success";
    },
    [fetchOrder.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = "error";
    },
  },
});

export const getCheckoutState = (state) => state.checkoutSlice;

export const {
  setOrder,
  setPaymentType,
  setPaymentStatus,
  setPreOrder,
  setStatus,
  setCancelOrder,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
