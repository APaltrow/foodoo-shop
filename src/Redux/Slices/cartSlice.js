import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalCount: 0,
  totalCost: 0,
  products: [],
};

const calculateTotals = (state) => {
  state.totalCount = state.products.reduce((res, val) => res + val.count, 0);
  state.totalCost = state.products.reduce(
    (res, val) => res + val.activeSize.price * val.count,
    0
  );
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      const item = state.products.filter(
        (item) =>
          item.id === action.payload.id &&
          item.activeSize.size === action.payload.activeSize.size
      );

      item.length > 0
        ? item[0].count++
        : (state.products = [...state.products, action.payload]);

      calculateTotals(state);
    },
    plusProduct: (state, action) => {
      const item = state.products.filter(
        (item) =>
          item.id === action.payload.id &&
          item.activeSize.size === action.payload.activeSize.size
      );
      item[0].count++;
      calculateTotals(state);
    },
    minusProduct: (state, action) => {
      const item = state.products.filter(
        (item) =>
          item.id === action.payload.id &&
          item.activeSize.size === action.payload.activeSize.size
      );
      item[0].count--;
      calculateTotals(state);
    },
    removeProduct: (state, action) => {
      const checkItem = (item) => {
        if (item.id !== action.payload.id) {
          return item;
        } else if (item.activeSize.size !== action.payload.activeSize.size) {
          return item;
        } else {
          return false;
        }
      };

      const products = state.products.filter(checkItem);
      state.products = [...products];

      calculateTotals(state);
    },
    clearCart: (state) => {
      state.products = [];
      state.totalCost = 0;
      state.totalCount = 0;
    },
  },
});

export const getCartState = (state) => state.cartSlice;

export const {
  addProducts,
  plusProduct,
  minusProduct,
  removeProduct,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
