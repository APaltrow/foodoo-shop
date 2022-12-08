import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { ICartItem } from "../../@types";

interface ICartState {
  totalCount: number;
  totalCost: number;
  discount: number;
  products: ICartItem[];
}

const initialState: ICartState = {
  totalCount: 0,
  totalCost: 0,
  discount: 0,
  products: [],
};

const calculateTotals = (state: ICartState) => {
  // Calculating total count
  state.totalCount = +state.products.reduce(
    (res: number, val: ICartItem) => res + val.count,
    0
  );
  // Calculating discount
  state.discount = +state.products
    .reduce(
      (res: number, val: ICartItem) =>
        res +
        (val.activeSize.savedOnDiscount
          ? val.activeSize.savedOnDiscount * val.count
          : 0),
      0
    )
    .toFixed(2);
  // Calculating total Cost
  state.totalCost = +state.products
    .reduce(
      (res: number, val: ICartItem) =>
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
    addProducts: (state, action: PayloadAction<ICartItem>) => {
      const item = state.products.filter(
        (item) => item.lot_id === action.payload.lot_id
      );

      item.length > 0
        ? item[0].count++
        : (state.products = [...state.products, action.payload]);

      calculateTotals(state);
    },
    plusProduct: (state, action: PayloadAction<string>) => {
      const item = state.products.filter(
        (item) => item.lot_id === action.payload
      );

      item[0].count++;

      calculateTotals(state);
    },
    minusProduct: (state, action: PayloadAction<string>) => {
      const item = state.products.filter(
        (item) => item.lot_id === action.payload
      );

      item[0].count--;

      calculateTotals(state);
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      const products = state.products.filter(
        (item) => item.lot_id !== action.payload
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

export const getCartState = (state: RootState) => state.cartSlice;

export const {
  addProducts,
  plusProduct,
  minusProduct,
  removeProduct,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
