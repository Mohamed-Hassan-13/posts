import { configureStore } from "@reduxjs/toolkit";
import postsSliceReducer from "./reducers";
export const store = configureStore({
  reducer: {
    posts: postsSliceReducer,
  },
});
