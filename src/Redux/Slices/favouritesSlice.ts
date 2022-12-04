import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { FAVOURITES_URL } from "../../constants/Urls";
import { RootState } from "../store";
import { StatusList } from "./dishCards";
import { IActiveSizeWithDiscount } from "../../Hooks/useDiscount";

export const fetchAddFavourites = createAsyncThunk<FetchAddFav, FetchAddFav>(
  "favourites/fetchAddFavourites",
  async (favourite) => {
    const { data }: { data: FetchAddFav } = await axios.post(
      FAVOURITES_URL,
      favourite
    );

    return data;
  }
);
export const fetchFavourites = createAsyncThunk<Favourite[], string>(
  "favourites/fetchFavourites",
  async (uid) => {
    const { data }: { data: Favourite[] } = await axios.get(
      `${FAVOURITES_URL}?uid=${uid}`
    );

    return data;
  }
);
export const fetchDeleteFavourites = createAsyncThunk<Favourite, string>(
  "favourites/fetchDeleteFavourites",
  async (favId) => {
    const { data }: { data: Favourite } = await axios.delete(
      `${FAVOURITES_URL}/${favId}`
    );

    return data;
  }
);
type FetchAddFav = {
  uid: string;
  favourites: Favourite;
};
type Favourite = {
  id: string;
  uid?: string;
  favId?: string;

  imgURL: string;
  title: string;
  specialOrder: string[];
  size: IActiveSizeWithDiscount;
};

type FavouritesState = {
  favourites: Favourite[];
  error: string;
  status: StatusList;
};

const initialState: FavouritesState = {
  favourites: [],
  status: StatusList.IDLE,
  error: "",
};

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavourites: (state, action: PayloadAction<Favourite[]>) => {
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
          //@ts-ignore
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

{
  /*  
extraReducers: {
   
   
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
  
  
  */
}
