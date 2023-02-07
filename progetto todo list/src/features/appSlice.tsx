import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState, Mode } from "./app";

const initialState: AppState = {
  viewMode: Mode.LIGHT,
  editMode: false,
};

export const appSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setMode(state, action: PayloadAction<Mode>) {
      state.viewMode = action.payload;
    },
    setEditMode(state, action: PayloadAction<boolean>) {
      state.editMode = action.payload;
    },
  },
});

export const { setMode, setEditMode } = appSlice.actions;

export default appSlice.reducer;
