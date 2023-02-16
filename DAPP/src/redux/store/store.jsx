import { configureStore } from "@reduxjs/toolkit";
import ineryReducer from "../slices/InerySlices";

const store = configureStore({
  reducer: {
    inery: ineryReducer,
  },
});

export default store;
