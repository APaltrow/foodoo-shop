import axios from "axios";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { ORDERS_URL } from "../../constants/Urls";
import { StatusList } from "./dishCards";
import { RootState } from "../store";

export const fetchOrder = createAsyncThunk<Order, Order>(
  "checkout/fetchOrder",
  async (order) => {
    const { data }: { data: Order[] } = await axios.post(ORDERS_URL, order);
    return data[0];
  }
);

export type Check = {
  title: string;
  count: number;
  size: string;
  price: number;
  specialOrder: string;
};

export type Preorder = {
  hours: number | null;
  dayPart: string | null;
  calendar: string | null;
};

type Order = {
  uid: string | null;
  orderId: string | null;
  recipient: string | null;
  deliveryAddress: string | null;
  paymentType: string;
  totalCost: number | null;
  orderDate: string | null;
  paymentStatus: string | null;
  orderStatus: string;

  ordercheck: Check[] | null;
  preorder: Preorder | null;
};

type OrderState = {
  order: Order;

  status: StatusList;
  error: string;
};

const initialState: OrderState = {
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

  status: StatusList.IDLE,
  error: "",
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<Order>) => {
      state.order = { ...action.payload };
      state.status = StatusList.IDLE;
      state.error = "";
    },
    setPaymentType: (state, action: PayloadAction<string>) => {
      state.order.paymentType = action.payload;
    },
    setPaymentStatus: (state, action: PayloadAction<string>) => {
      state.order.paymentStatus = action.payload;
    },
    setPreOrder: (state, action: PayloadAction<Preorder | null>) => {
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
      state.status = StatusList.IDLE;
      state.error = "";
    },
    setStatus: (state) => {
      state.status = StatusList.IDLE;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.status = StatusList.PENDING;
        state.error = "";
      })
      .addCase(fetchOrder.fulfilled, (state) => {
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

        state.status = StatusList.SUCCESS;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.error = action.error.message || "error";
        state.status = StatusList.ERROR;
      });
  },
});

export const getCheckoutState = (state: RootState) => state.checkoutSlice;

export const {
  setOrder,
  setPaymentType,
  setPaymentStatus,
  setPreOrder,
  setStatus,
  setCancelOrder,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;

{
  /* extraReducers: {
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
  } */
}
