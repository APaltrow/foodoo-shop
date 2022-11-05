import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDiscount } from "../../Helpers/useDiscount";

const Discount = (size, discount) => {
  const { calculatedActiveSize } = useDiscount();
  const activeSize = calculatedActiveSize(size, discount);

  return activeSize;
};
export const fetchSingleProduct = createAsyncThunk(
  "singleProduct/fetchSingleProduct",
  async (id) => {
    const { data } = await axios.get(
      `https://633577edea0de5318a142d98.mockapi.io/items/${id}`
    );

    return data;
  }
);
export const fetchRateProduct = createAsyncThunk(
  "singleProduct/fetchRateProduct",

  async (params) => {
    const { id, reviews } = params;
    const { data } = await axios.put(
      `https://633577edea0de5318a142d98.mockapi.io/items/${id}`,
      { reviews: reviews }
    );

    return data;
  }
);

const initialState = {
  singleProduct: {},
  activeSize: {},
  specialOrder: [],

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
    setActiveSize: (state, action) => {
      state.activeSize = Discount(
        { ...action.payload },
        state.singleProduct.discount
      );
    },
    setSpecialOrder: (state, action) => {
      state.specialOrder = [...action.payload];
    },
  },
  extraReducers: {
    [fetchSingleProduct.pending]: (state) => {
      state.status = "pending";
    },
    [fetchSingleProduct.fulfilled]: (state, action) => {
      state.singleProduct = action.payload;
      state.activeSize = Discount(
        action.payload.sizes[0],
        action.payload.discount
      );

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

export const { setSingleProduct, setActiveSize, setSpecialOrder } =
  singleProductSlice.actions;

export default singleProductSlice.reducer;
