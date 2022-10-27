import { configureStore } from "@reduxjs/toolkit";

import setSortCategory from "./Slices/sortCategory";
import dishCards from "./Slices/dishCards";
import cartSlice from "./Slices/cartSlice";
import authSlice from "./Slices/authSlice";
import singleProductSlice from "./Slices/singleProductSlice";

export const store = configureStore({
  reducer: {
    sortCategory: setSortCategory,
    dishCards: dishCards,
    cartSlice: cartSlice,
    authSlice: authSlice,
    singleProductSlice: singleProductSlice,
  },
});
