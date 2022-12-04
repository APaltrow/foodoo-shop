import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ORDERS_URL } from "../../constants/Urls";

import { StatusList } from "./dishCards";
import { RootState } from "../store";

export const fetchOrdersList = createAsyncThunk<Order[], string>(
  "order/fetchOrdersList",
  async (id) => {
    const { data }: { data: Order[] } = await axios.get(
      `${ORDERS_URL}?uid=${id}`
    );
    return data;
  }
);
export const fetchDeliveredOrder = createAsyncThunk<Order[], Order>(
  "order/fetchDeliveredOrder",
  async (order) => {
    const { id } = order;
    const { data }: { data: Order[] } = await axios.put(
      `${ORDERS_URL}/${id}`,
      order
    );
    return data;
  }
);

type Preorder = {
  hours: number;
  dayPart: string;
  calendar: string;
};

type OrderCheck = {
  price: number;
  count: number;
  title: string;
  size: string;
  specialOrder: string;
};

type Order = {
  id: string;
  uid: string;
  orderId: string;
  recipient: string;
  deliveryAddress: string;
  paymentType: string;
  orderDate: string;
  preorder: Preorder | null;
  paymentStatus: string | null;
  orderStatus: string;
  totalCost: number;

  ordercheck: OrderCheck[];
};

type OrderState = {
  pendingOrder: Order | null;
  ordersList: Order[];

  status: StatusList;
  error: string;
};

const initialState: OrderState = {
  pendingOrder: null,
  ordersList: [],

  status: StatusList.IDLE,
  error: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setStatus: (state) => {
      state.status = StatusList.IDLE;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersList.pending, (state) => {
        state.status = StatusList.PENDING;
        state.error = "";
      })
      .addCase(fetchOrdersList.fulfilled, (state, action) => {
        const pendingOrder = action.payload.filter(
          (order) => order.orderStatus === "pending"
        );
        if (pendingOrder.length) {
          state.pendingOrder = pendingOrder[0];
        }
        state.ordersList = action.payload;
        state.status = StatusList.SUCCESS;
        state.error = "";
      })
      .addCase(fetchOrdersList.rejected, (state, action) => {
        state.error = action.error.message || "error";
        state.status = StatusList.ERROR;
      })
      .addCase(fetchDeliveredOrder.pending, (state) => {
        state.status = StatusList.PENDING;
        state.error = "";
      })
      .addCase(fetchDeliveredOrder.fulfilled, (state, action) => {
        state.ordersList = [
          ...state.ordersList.filter(
            (order) => order.orderId !== action.payload[0].orderId
          ),
          action.payload[0],
        ];

        state.pendingOrder = null;

        state.status = StatusList.SUCCESS;
        state.error = "";
      })
      .addCase(fetchDeliveredOrder.rejected, (state, action) => {
        state.status = StatusList.ERROR;
        state.error = action.error.message || "error";
      });
  },
});

export const getOrderState = (state: RootState) => state.orderSlice;

export const { setStatus } = orderSlice.actions;

export default orderSlice.reducer;

{
  /* extraReducers: {
    //========= 1

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

    //========= 2

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
  },*/
}
