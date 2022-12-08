import axios from "axios";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ITEMS_URL } from "../../constants/Urls";
import { RootState } from "../store";

import { IProduct, StatusList, IReview, IState } from "../../@types";

export const fetchSingleProduct = createAsyncThunk<IProduct, string>(
  "singleProduct/fetchSingleProduct",
  async (id) => {
    const { data } = await axios.get<IProduct>(`${ITEMS_URL}/${id}`);

    return data;
  }
);
export const fetchRateProduct = createAsyncThunk<IProduct, FetchReview>(
  "singleProduct/fetchRateProduct",

  async (params) => {
    const { id, reviews } = params;
    const { data } = await axios.put<IProduct>(`${ITEMS_URL}/${id}`, {
      reviews,
    });

    return data;
  }
);

interface FetchReview {
  id: string;
  reviews: IReview[];
}

interface ISingleProductState extends IState {
  singleProduct: IProduct | null;
}
//refactor-fix singleProduct need to be reviewed
const initialState: ISingleProductState = {
  singleProduct: null,

  status: StatusList.IDLE,
  error: "",
};

export const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {
    setSingleProduct: (state, action: PayloadAction<IProduct>) => {
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
        state.status = StatusList.PENDING_RATE;
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
