import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { FAVOURITES_URL } from "../../constants/Urls";
import { RootState } from "../store";

import { IFavourite, IState, StatusList } from "../../@types";

export const fetchAddFavourites = createAsyncThunk<
  IFetchFavourite,
  IFetchFavourite
>("favourites/fetchAddFavourites", async (favourite) => {
  const { data } = await axios.post<IFetchFavourite>(FAVOURITES_URL, favourite);

  return data;
});
export const fetchFavourites = createAsyncThunk<IFetchFavourite[], string>(
  "favourites/fetchFavourites",
  async (uid) => {
    const { data } = await axios.get<IFetchFavourite[]>(
      `${FAVOURITES_URL}?uid=${uid}`
    );

    return data;
  }
);
export const fetchDeleteFavourites = createAsyncThunk<IFavourite, string>(
  "favourites/fetchDeleteFavourites",
  async (favId) => {
    const { data } = await axios.delete<IFavourite>(
      `${FAVOURITES_URL}/${favId}`
    );

    return data;
  }
);

interface IFetchFavourite {
  id: string;
  uid: string;
  favourites: IFavourite;
}

interface IFavouritesState extends IState {
  favourites: IFavourite[];
}

const initialState: IFavouritesState = {
  favourites: [],
  status: StatusList.IDLE,
  error: "",
};

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavourites: (state, action: PayloadAction<IFavourite[]>) => {
      state.favourites = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddFavourites.pending, (state) => {
        state.status = StatusList.PENDING;
        state.error = "";
        state.favourites = [];
      })
      .addCase(fetchAddFavourites.fulfilled, (state) => {
        state.status = StatusList.SUCCESS;
      })
      .addCase(fetchAddFavourites.rejected, (state, action) => {
        state.favourites = [];

        state.status = StatusList.ERROR;
        state.error = action.error.message || "error";
      })
      .addCase(fetchFavourites.pending, (state) => {
        state.status = StatusList.PENDING;
        state.error = "";
        state.favourites = [];
      })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.favourites = action.payload.map((favourite) => ({
          ...favourite.favourites,
          favId: favourite.id,
        }));

        state.status = StatusList.SUCCESS;
      })
      .addCase(fetchFavourites.rejected, (state, action) => {
        state.favourites = [];

        state.status = StatusList.ERROR;
        state.error = action.error.message || "error";
      })
      .addCase(fetchDeleteFavourites.pending, (state) => {
        state.status = StatusList.PENDING;
        state.error = "";
      })
      .addCase(fetchDeleteFavourites.fulfilled, (state, action) => {
        state.favourites = state.favourites.filter(
          (fav) => fav.favId !== action.payload.id
        );

        state.status = StatusList.SUCCESS;
      })
      .addCase(fetchDeleteFavourites.rejected, (state, action) => {
        state.favourites = [];

        state.status = StatusList.ERROR;
        state.error = action.error.message || "error";
      });
  },
});

export const getFavouritesState = (state: RootState) => state.favouritesSlice;

export const { addFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;
