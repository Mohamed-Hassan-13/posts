import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getallposts = createAsyncThunk("posts/getallposts", async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return res.data;
});
export const Deleteitem = createAsyncThunk("posts/deleteposts", async (id) => {
  const res = await axios.delete(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  return id;
});
export const Additem = createAsyncThunk("posts/additem", async (item) => {
  const res = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    item
  );
  return item;
});
export const EditItem = createAsyncThunk("posts/edititem", async (obj) => {
  const res = await axios.put(
    `https://jsonplaceholder.typicode.com/posts/${obj.id}`,
    obj.title
  );
  return obj;
});

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getallposts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getallposts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(getallposts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(Deleteitem.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(Additem.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(EditItem.fulfilled, (state, action) => {
        state.posts.find((post) => post.id === action.payload.id).title =
          action.payload.title;
      });
  },
});
export default postsSlice.reducer;
