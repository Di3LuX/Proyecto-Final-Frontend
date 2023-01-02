import { configureStore } from "@reduxjs/toolkit";
import contentSlice from "../slices/contentSlice";
import userSlice from "../slices/userSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    content: contentSlice,
  },
});
