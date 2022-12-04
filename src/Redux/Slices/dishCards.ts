import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { Product } from "./cartSlice";

export const fetchDishCards = createAsyncThunk<Product[], string>(
  "dishCards/fetchDishCards",
  async (url) => {
    const { data }: { data: Product[] } = await axios.get(url);

    return data;
  }
);

export enum StatusList {
  IDLE = "",
  PENDING = "pending",
  SUCCESS = "success",
  ERROR = "error",
}

type DishCardsState = {
  dishCards: Product[];
  status: StatusList;
  error: string;
};

const initialState: DishCardsState = {
  dishCards: [],
  status: StatusList.IDLE,
  error: "",
};

export const dishCardsSlice = createSlice({
  name: "dishCards",
  initialState,
  reducers: {
    setDishCards: (state, action: PayloadAction<Product[]>) => {
      state.dishCards = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchDishCards.pending, (state) => {
        state.status = StatusList.PENDING;
        state.error = "";

        state.dishCards = [];
      })
      .addCase(fetchDishCards.fulfilled, (state, action) => {
        state.dishCards = action.payload;

        state.status = StatusList.SUCCESS;
        state.error = "";
      })
      .addCase(fetchDishCards.rejected, (state, action) => {
        state.dishCards = [];

        state.status = StatusList.ERROR;
        state.error = action.error.message || "error";
      });
  },
});

export const getDishCardsState = (state: RootState) => state.dishCards;

export const { setDishCards } = dishCardsSlice.actions;

export default dishCardsSlice.reducer;
