import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ITEMS_URL } from "../../constants/Urls";

export const fetchSingleProduct = createAsyncThunk(
  "singleProduct/fetchSingleProduct",
  async (id) => {
    const { data } = await axios.get(`${ITEMS_URL}/${id}`);

    return data;
  }
);
export const fetchRateProduct = createAsyncThunk(
  "singleProduct/fetchRateProduct",

  async (params) => {
    const { id, reviews } = params;
    const { data } = await axios.put(`${ITEMS_URL}/${id}`, {
      reviews: reviews,
    });

    return data;
  }
);

const initialState = {
  singleProduct: {},

  status: "",
  error: "",
};

export const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {
    setSingleProduct: (state, action) => {
      state.singleProduct = action.payload;
    },
  },
  extraReducers: {
    [fetchSingleProduct.pending]: (state) => {
      state.status = "pending";
      state.error = "";
    },
    [fetchSingleProduct.fulfilled]: (state, action) => {
      state.singleProduct = action.payload;

      state.status = "success";
    },
    [fetchSingleProduct.rejected]: (state, action) => {
      state.singleProduct = {};
      state.activeSize = [];
      state.error = action.error.message;

      state.status = "error";
    },
    [fetchRateProduct.pending]: (state) => {
      state.status = "pending-rate";
      state.error = "";
    },
    [fetchRateProduct.fulfilled]: (state, action) => {
      state.singleProduct.reviews = action.payload.reviews;
      state.status = "success";
    },
    [fetchRateProduct.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = "error";
    },
  },
});

export const getSingleProductState = (state) => state.singleProductSlice;

export const { setSingleProduct } = singleProductSlice.actions;

export default singleProductSlice.reducer;
