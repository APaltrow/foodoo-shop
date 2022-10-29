import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDishCards = createAsyncThunk(
  "dishCards/fetchDishCards",
  async (url) => {
    const { data } = await axios.get(url);

    return data;
  }
);

const initialState = {
  dishCards: [],
  status: "",
  error: "",
};

export const dishCardsSlice = createSlice({
  name: "dishCards",
  initialState,
  reducers: {
    setDishCards: (state, action) => {
      state.dishCards = action.payload;
    },
  },
  extraReducers: {
    [fetchDishCards.pending]: (state) => {
      state.status = "pending";
      state.dishCards = [];
    },
    [fetchDishCards.fulfilled]: (state, action) => {
      state.dishCards = action.payload;

      state.status = "success";
    },
    [fetchDishCards.rejected]: (state, action) => {
      state.dishCards = [];
      state.error = action.error.message;

      state.status = "error";
    },
  },
});

export const getDishCardsState = (state) => state.dishCards;

export const { setIsLoading, setDishCards } = dishCardsSlice.actions;

export default dishCardsSlice.reducer;
