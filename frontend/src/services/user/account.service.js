import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseUrl from "../../apis/axios";

export const getDataUser = createAsyncThunk("get/user", async (id) => {
  try {
    const response = await BaseUrl.get(`accounts/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

// lấy danh sách chat
export const getInbox = createAsyncThunk("get/inbox", async (id) => {
  try {
    const response = await BaseUrl.get(`accounts/inbox/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const sendInbox = createAsyncThunk("post/inbox", async (message) => {
  try {
    const response = await BaseUrl.post(`accounts/inbox`, message);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
