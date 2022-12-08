import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ORDERS_URL } from "../../constants/Urls";

import { RootState } from "../store";
import { IOrder, IState, StatusList } from "../../@types";

export const fetchOrdersList = createAsyncThunk<IListOrder[], string>(
  "order/fetchOrdersList",
  async (id) => {
    const { data }: { data: IListOrder[] } = await axios.get(
      `${ORDERS_URL}?uid=${id}`
    );
    return data;
  }
);
export const fetchDeliveredOrder = createAsyncThunk<IListOrder[], IListOrder>(
  "order/fetchDeliveredOrder",
  async (order) => {
    const { id } = order;
    const { data }: { data: IListOrder[] } = await axios.put(
      `${ORDERS_URL}/${id}`,
      order
    );
    return data;
  }
);

interface IListOrder extends IOrder {
  id: string;
}

interface IOrderState extends IState {
  pendingOrder: IListOrder | null;
  ordersList: IListOrder[];
}

const initialState: IOrderState = {
  ordersList: [],
  pendingOrder: null,

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
        //refactor-fix || no types for ActionPayload
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
