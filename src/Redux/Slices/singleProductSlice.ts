import axios from "axios";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ITEMS_URL } from "../../constants/Urls";
import { RootState } from "../store";
import { Product, Review } from "./cartSlice";
import { StatusList } from "./dishCards";

export const fetchSingleProduct = createAsyncThunk<Product, string>(
  "singleProduct/fetchSingleProduct",
  async (id) => {
    const { data } = await axios.get<Product>(`${ITEMS_URL}/${id}`);

    return data;
  }
);
export const fetchRateProduct = createAsyncThunk<Product, FetchReview>(
  "singleProduct/fetchRateProduct",

  async (params) => {
    const { id, reviews } = params;
    const { data } = await axios.put<Product>(`${ITEMS_URL}/${id}`, {
      reviews,
    });

    return data;
  }
);

type FetchReview = { id: string; reviews: Review[] };

type SingleProductState = {
  singleProduct: Product | null;

  status: StatusList | string;
  error: string;
};

const initialState: SingleProductState = {
  singleProduct: null,

  status: StatusList.IDLE,
  error: "",
};

export const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {
    setSingleProduct: (state, action: PayloadAction<Product>) => {
      state.singleProduct = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.status = StatusList.PENDING;
        state.error = "";
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.singleProduct = action.payload;
        state.status = StatusList.SUCCESS;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.singleProduct = null;
        state.status = StatusList.ERROR;
        state.error = action.error.message || "error";
      })
      .addCase(fetchRateProduct.pending, (state) => {
        state.status = "pending-rate";
        state.error = "";
      })
      .addCase(fetchRateProduct.fulfilled, (state, action) => {
        if (state.singleProduct) {
          state.singleProduct.reviews = action.payload.reviews;
        }

        state.status = StatusList.SUCCESS;
      })
      .addCase(fetchRateProduct.rejected, (state, action) => {
        state.status = StatusList.ERROR;
        state.error = action.error.message || "error";
      });
  },
});

export const getSingleProductState = (state: RootState) =>
  state.singleProductSlice;

export const { setSingleProduct } = singleProductSlice.actions;

export default singleProductSlice.reducer;

{
  /*
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
      
      state.error = action.error.message;

      state.status = "error";
    },
    //=========2

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

 
  
  */
}
