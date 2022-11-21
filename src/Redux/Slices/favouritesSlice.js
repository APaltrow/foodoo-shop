import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { FAVOURITES_URL } from "../../constants/Urls";

export const fetchAddFavourites = createAsyncThunk(
  "favourites/fetchAddFavourites",
  async (favourite) => {
    const { data } = await axios.post(FAVOURITES_URL, favourite);

    return data;
  }
);
export const fetchFavourites = createAsyncThunk(
  "favourites/fetchFavourites",
  async (uid) => {
    const { data } = await axios.get(`${FAVOURITES_URL}?uid=${uid}`);

    return data;
  }
);
export const fetchDeleteFavourites = createAsyncThunk(
  "favourites/fetchDeleteFavourites",
  async (favId) => {
    const { data } = await axios.delete(`${FAVOURITES_URL}/${favId}`);

    return data;
  }
);

const initialState = {
  favourites: [],
  status: "",
  error: "",
};

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavourites: (state, action) => {
      state.favourites = action.payload;
    },
  },
  extraReducers: {
    [fetchAddFavourites.pending]: (state) => {
      state.status = "pending";
      state.error = "";
      state.favourites = [];
    },
    [fetchAddFavourites.fulfilled]: (state) => {
      state.status = "success";
    },
    [fetchAddFavourites.rejected]: (state, action) => {
      state.favourites = [];
      state.error = action.error.message;

      state.status = "error";
    },
    [fetchFavourites.pending]: (state) => {
      state.status = "pending";
      state.error = "";
      state.favourites = [];
    },
    [fetchFavourites.fulfilled]: (state, action) => {
      state.favourites = action.payload.map((favourite) => ({
        ...favourite.favourites,
        favId: favourite.id,
      }));
      state.status = "success";
    },
    [fetchFavourites.rejected]: (state, action) => {
      state.favourites = [];
      state.error = action.error.message;

      state.status = "error";
    },
    [fetchDeleteFavourites.pending]: (state) => {
      state.status = "pending";
      state.error = "";
    },
    [fetchDeleteFavourites.fulfilled]: (state, action) => {
      state.favourites = state.favourites.filter(
        (fav) => fav.favId !== action.payload.id
      );

      state.status = "success";
    },
    [fetchDeleteFavourites.rejected]: (state, action) => {
      state.favourites = [];
      state.error = action.error.message;

      state.status = "error";
    },
  },
});

export const getFavouritesState = (state) => state.favouritesSlice;

export const { addFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;
