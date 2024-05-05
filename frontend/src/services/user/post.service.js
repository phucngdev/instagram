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

export const newFeed = createAsyncThunk("get/newfeed", async (id) => {
  try {
    const response = await BaseUrl.get(`post/newfeed/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
