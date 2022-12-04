import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../Hooks/useProduct";
import { RootState } from "../store";

export type Size = {
  size: string;
  price: number;
  weight: number;
  nutrition: number;
};
export type Review = {
  rating: number;
  comment: string;

  uid?: string;
  ratingId?: number;
  commenter?: string;
  timestamp?: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  imgURL: string;
  category: number;
  price: number;
  discount?: number;
  rating: number;
  isVegitarian: boolean;

  ingredients: string[];
  sizes: Size[];
  reviews: Review[];
};

// ==========!!! products to be reviewed

type CartState = {
  totalCount: number;
  totalCost: number;
  discount: number;
  products: CartItem[];
};

const initialState: CartState = {
  totalCount: 0,
  totalCost: 0,
  discount: 0,
  products: [],
};

const calculateTotals = (state: CartState) => {
  state.totalCount = +state.products.reduce(
    (res: number, val: CartItem) => res + val.count,
    0
  );
  state.discount = +state.products
    .reduce(
      (res: number, val: CartItem) =>
        res +
        (val.activeSize.savedOnDiscount
          ? val.activeSize.savedOnDiscount * val.count
          : 0),
      0
    )
    .toFixed(2);
  state.totalCost = +state.products
    .reduce(
      (res: number, val: CartItem) =>
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
    addProducts: (state, action: PayloadAction<CartItem>) => {
      const item = state.products.filter(
        (item) => item.lot_id === action.payload.lot_id
      );

      item.length > 0
        ? item[0].count++
        : (state.products = [...state.products, action.payload]);

      calculateTotals(state);
    },
    plusProduct: (state, action: PayloadAction<CartItem>) => {
      const item = state.products.filter(
        (item) => item.lot_id === action.payload.lot_id
      );
      item[0].count++;
      calculateTotals(state);
    },
    minusProduct: (state, action: PayloadAction<CartItem>) => {
      const item = state.products.filter(
        (item) => item.lot_id === action.payload.lot_id
      );
      item[0].count--;
      calculateTotals(state);
    },
    removeProduct: (state, action: PayloadAction<CartItem>) => {
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

export const getCartState = (state: RootState) => state.cartSlice;

export const {
  addProducts,
  plusProduct,
  minusProduct,
  removeProduct,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
