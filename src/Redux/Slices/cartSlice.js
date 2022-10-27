import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalCount: 0,
  totalCost: 0,
  discount: 0,
  products: [],
};

const calculateTotals = (state) => {
  state.totalCount = state.products.reduce((res, val) => res + val.count, 0);
  state.discount = state.products
    .reduce((res, val) => res + val.activeSize.savedOnDiscount * val.count, 0)
    .toFixed(2);
  state.totalCost = state.products
    .reduce(
      (res, val) =>
        res +
        (val.activeSize.discountedPrice
          ? val.activeSize.discountedPrice
          : val.activeSize.price) *
          val.count,
      0
    )
    .toFixed(2);
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      const item = state.products.filter(
        (item) => item.lot_id === action.payload.lot_id
      );

      item.length > 0
        ? item[0].count++
        : (state.products = [...state.products, action.payload]);

      calculateTotals(state);
    },
    plusProduct: (state, action) => {
      const item = state.products.filter(
        (item) => item.lot_id === action.payload.lot_id
      );
      item[0].count++;
      calculateTotals(state);
    },
    minusProduct: (state, action) => {
      const item = state.products.filter(
        (item) => item.lot_id === action.payload.lot_id
      );
      item[0].count--;
      calculateTotals(state);
    },
    removeProduct: (state, action) => {
      const products = state.products.filter(
        (item) => item.lot_id !== action.payload.lot_id
      );
      state.products = [...products];

      calculateTotals(state);
    },
    clearCart: (state) => {
      state.products = [];
      state.totalCost = 0;
      state.totalCount = 0;
      state.discount = 0;
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
