import { createSlice } from "@reduxjs/toolkit";

export const contentSlice = createSlice({
  name: "content",
  initialState: {
    content: {},
  },
  reducers: {
    viewOrder: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    contentType: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { viewOrder, contentType } = contentSlice.actions;

export const contentData = (state) => state.content;

export default contentSlice.reducer;
