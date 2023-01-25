import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { IState, StatusList, IProduct } from "../../@types";

export const fetchDishCards = createAsyncThunk<IProduct[], string>(
  "dishCards/fetchDishCards",
  async (url) => {
    const { data } = await axios.get<IProduct[]>(url);

    return data;
  }
);

interface IDishCardsState extends IState {
  dishCards: IProduct[];
}

const initialState: IDishCardsState = {
  dishCards: [],

  status: StatusList.IDLE,
  error: "",
};

export const dishCardsSlice = createSlice({
  name: "dishCards",
  initialState,
  reducers: {
    setDishCards: (state, action: PayloadAction<IProduct[]>) => {
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
