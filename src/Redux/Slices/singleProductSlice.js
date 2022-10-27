import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  singleProduct: {},
  activeSize: {},
  specialOrder: [],

  isLoading: false,
};

export const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {
    setSingleProduct: (state, action) => {
      state.singleProduct = action.payload;
    },
    setActiveSize: (state, action) => {
      state.activeSize = { ...action.payload };
    },
    setSpecialOrder: (state, action) => {
      state.specialOrder = [...action.payload];
    },
  },
});

export const getSingleProductState = (state) => state.singleProductSlice;

export const { setSingleProduct, setActiveSize, setSpecialOrder } =
  singleProductSlice.actions;

export default singleProductSlice.reducer;
