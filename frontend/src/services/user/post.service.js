import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseUrl from "../../apis/axios";

export const createPost = createAsyncThunk("post/posts", async (data) => {
  try {
    const response = await BaseUrl.post(`post/createpost`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
