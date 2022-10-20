import { createSlice } from "@reduxjs/toolkit";
import { navigation, sort } from "../../constants/Constants";

const initialState = {
  activeCategory: 0,
  sortBy: 0,
  isASC: false,
  searchValue: "",
  activePage: 1,
  totalPages: 0,
  navigation,
  sort,
};

export const sortCategorySlice = createSlice({
  name: "sortCategory",
  initialState,
  reducers: {
    setSortCategory: (state, action) => {
      state.activeCategory = action.payload;
      state.activePage = 1;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setIsASC: (state, action) => {
      state.isASC = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
      state.activePage = 1;
    },
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = Math.ceil(action.payload / 4);
      if (state.activePage < 1) {
        state.activePage = 1;
      }
    },
  },
});

export const getSortCategoryState = (state) => state.sortCategory;

export const {
  setSortCategory,
  setSortBy,
  setIsASC,
  setSearchValue,
  setActivePage,
  setTotalPages,
} = sortCategorySlice.actions;

export default sortCategorySlice.reducer;
