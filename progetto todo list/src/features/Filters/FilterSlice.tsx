import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FiltersState, Category, Visibility } from "./Filters";

const initialState: FiltersState = {
  searchText: "",
  visibility: Visibility.ALL,
  categories: [],
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCompletedFilter(state, action: PayloadAction<Visibility>) {
      state.visibility = action.payload;
    },
    setSearchedText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },
    setFilterCategory(state, action: PayloadAction<Category>) {
      let condition = state.categories.includes(action.payload);
      if (!condition && action.payload !== "") {
        state.categories.push(action.payload);
      }
    },
    removeFilterCategory(state, action: PayloadAction<string>) {
      state.categories = state.categories.filter(
        (category) => category !== action.payload
      );
    },
  },
});

export const {
  setCompletedFilter,
  setSearchedText,
  setFilterCategory,
  removeFilterCategory,
} = filterSlice.actions;

export default filterSlice.reducer;
