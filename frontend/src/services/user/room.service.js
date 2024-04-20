import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseUrl from "../../apis/axios";

// lấy tất cả room
export const getAllRoom = createAsyncThunk("getAll/room", async (id) => {
  try {
    let response = await BaseUrl.get(`roomchat/direct/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

// lấy tt 1 room
export const getOneRoom = createAsyncThunk("getOne/room", async (data) => {
  try {
    const { userId, roomId } = data;
    let response = await BaseUrl.get(`roomchat/direct/${userId}/${roomId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

// tạo roomchat 1 vs 1
export const createRoomSingle = createAsyncThunk(
  "createOne/room",
  async (data) => {
    try {
      const { id } = data;
      let response = await BaseUrl.post(
        `roomchat/createroomsingle/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
