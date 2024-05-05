import { createSlice } from "@reduxjs/toolkit";
import { createPost, newFeed } from "../../services/user/post.service";

const postSlice = createSlice({
  name: "post",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = action.payload;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(newFeed.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(newFeed.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = action.payload;
      })
      .addCase(newFeed.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
