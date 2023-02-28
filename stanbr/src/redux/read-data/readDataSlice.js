import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  readLoading: false,
  isReaded: true,
  readedResponse: {},
};

export const readDataSlice = createSlice({
  name: "read",
  initialState,
  reducers: {
    setReadLoading: (state, action) => {
      state.readLoading = action.payload;
    },
    setIsReaded: (state, action) => {
      state.isReaded = action.payload;
    },
    setReadResponse: (state, action) => {
      state.readedResponse = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setReadLoading, setIsReaded, setReadResponse } =
  readDataSlice.actions;

export default readDataSlice.reducer;
