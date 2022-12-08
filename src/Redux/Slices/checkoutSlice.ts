import axios from "axios";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { ORDERS_URL } from "../../constants/Urls";

import { RootState } from "../store";
import { IOrder, IPreorder, IState, StatusList } from "../../@types";

export const fetchOrder = createAsyncThunk<IOrder, IOrder>(
  "checkout/fetchOrder",
  async (order) => {
    const { data }: { data: IOrder[] } = await axios.post(ORDERS_URL, order);
    return data[0];
  }
);

interface ICheckoutState extends IState {
  order: IOrder;
}

const initialState: ICheckoutState = {
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
    setOrder: (state, action: PayloadAction<IOrder>) => {
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
    setPreOrder: (state, action: PayloadAction<IPreorder | null>) => {
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
    setChekoutOrderStatus: (state) => {
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
  setChekoutOrderStatus,
  setCancelOrder,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
