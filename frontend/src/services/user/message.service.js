import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseUrl from "../../apis/axios";

export const sendInbox = createAsyncThunk("post/inbox", async (message) => {
  try {
    const { roomId, senderId } = message;
    const response = await BaseUrl.post(`inbox/${roomId}/${senderId}`, message);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
