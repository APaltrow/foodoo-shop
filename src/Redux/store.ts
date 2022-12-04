import { configureStore } from "@reduxjs/toolkit";

import setSortCategory from "./Slices/sortCategory";
import dishCards from "./Slices/dishCards";
import cartSlice from "./Slices/cartSlice";
import authSlice from "./Slices/authSlice";
import singleProductSlice from "./Slices/singleProductSlice";
import orderSlice from "./Slices/orderSlice";
import checkoutSlice from "./Slices/checkoutSlice";
import favouritesSlice from "./Slices/favouritesSlice";

export const store = configureStore({
  reducer: {
    sortCategory: setSortCategory,
    dishCards: dishCards,
    cartSlice: cartSlice,
    authSlice: authSlice,
    singleProductSlice: singleProductSlice,
    orderSlice: orderSlice,
    checkoutSlice: checkoutSlice,
    favouritesSlice: favouritesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
