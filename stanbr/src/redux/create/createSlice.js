import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createLoading: false,
  isCreated: true,
  createdResponse: {},
  id: "",
  message: "",
};

export const createDataSlice = createSlice({
  name: "create",
  initialState,
  reducers: {
    setCreateLoading: (state, action) => {
      state.createLoading = action.payload;
    },
    setIsCreated: (state, action) => {
      state.isCreated = action.payload;
    },
    setCreatedResponse: (state, action) => {
      state.createdResponse = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCreateLoading,
  setIsCreated,
  setCreatedResponse,
  setId,
  setMessage,
} = createDataSlice.actions;

export default createDataSlice.reducer;
