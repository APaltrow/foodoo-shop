import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dishCards: [],
  isLoading: false,
};

export const dishCardsSlice = createSlice({
  name: "dishCards",
  initialState,
  reducers: {
    setDishCards: (state, action) => {
      state.dishCards = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const getDishCardsState = (state) => state.dishCards;

export const { setIsLoading, setDishCards } = dishCardsSlice.actions;

export default dishCardsSlice.reducer;
