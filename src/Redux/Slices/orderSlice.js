import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ORDERS_URL } from "../../constants/Urls";

export const fetchOrder = createAsyncThunk("auth/fetchOrder", async (order) => {
  const { data } = await axios.post(ORDERS_URL, order);
  return data;
});
export const fetchOrdersList = createAsyncThunk(
  "auth/fetchOrdersList",
  async (id) => {
    const { data } = await axios.get(`${ORDERS_URL}?uid=${id}`);
    return data;
  }
);
export const fetchDeliveredOrder = createAsyncThunk(
  "auth/fetchDeliveredOrder",
  async (order) => {
    const { id } = order;
    const { data } = await axios.put(`${ORDERS_URL}/${id}`, order);
    return data;
  }
);

const initialState = {
  order: {
    uid: "",
    orderId: "",
    recipient: "",
    deliveryAddress: "",
    paymentType: "cash",
    ordercheck: "",
    totalCost: "",
    orderDate: "",
    paymentStatus: false,
    orderStatus: "pending",
    preorder: false,
  },
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
        uid: "",
        orderId: "",
        recipient: "",
        deliveryAddress: "",
        paymentType: "cash",
        ordercheck: "",
        totalCost: "",
        orderDate: "",
        orderStatus: "pending",
        paymentStatus: false,
        preorder: false,
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

export const {
  setOrder,
  setPaymentType,
  setPaymentStatus,
  setPreOrder,
  setStatus,
  setCancelOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
