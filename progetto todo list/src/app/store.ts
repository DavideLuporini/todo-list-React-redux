import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import todosSlice from "../features/Todo/todosSlice";
import filterSlice from "../features/Filters/FilterSlice";
import appSlice from "../features/appSlice";

export const store = configureStore({
  reducer: {
    todo: todosSlice,
    filters: filterSlice,
    app: appSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
