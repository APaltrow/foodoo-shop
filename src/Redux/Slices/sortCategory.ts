import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SORT, ISort } from "../../constants/Sort";
import { NAVIGATION, INatigation } from "../../constants/Navigation";
import { RootState } from "../store";

type SortState = {
  activeCategory: number;
  sortBy: number;
  isASC: boolean;
  searchValue: string;
  activePage: number;
  totalPages: number;
  NAVIGATION: INatigation[];
  SORT: ISort[];
};

const initialState: SortState = {
  activeCategory: 0,
  sortBy: 0,
  isASC: false,
  searchValue: "",
  activePage: 1,
  totalPages: 0,
  NAVIGATION,
  SORT,
};

export const sortCategorySlice = createSlice({
  name: "sortCategory",
  initialState,
  reducers: {
    setSortCategory: (state, action: PayloadAction<number>) => {
      state.activeCategory = action.payload;
      state.activePage = 1;
    },
    setSortBy: (state, action: PayloadAction<number>) => {
      state.sortBy = action.payload;
    },
    setIsASC: (state, action: PayloadAction<boolean>) => {
      state.isASC = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
      state.activePage = 1;
    },
    setActivePage: (state, action: PayloadAction<number>) => {
      state.activePage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = Math.ceil(action.payload / 4);
      if (state.activePage < 1) {
        state.activePage = 1;
      }
    },
  },
});

export const getSortCategoryState = (state: RootState) => state.sortCategory;

export const {
  setSortCategory,
  setSortBy,
  setIsASC,
  setSearchValue,
  setActivePage,
  setTotalPages,
} = sortCategorySlice.actions;

export default sortCategorySlice.reducer;
