import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createDataSlice from "../create/createSlice";
import readDataSlice from "../read-data/readDataSlice";
export const rootReducer = combineReducers({
  createDataSlice,
  readDataSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
