import { createSlice } from "@reduxjs/toolkit";
import {
  createRoomSingle,
  getAllRoom,
  getOneRoom,
} from "../../services/user/room.service";

const roomSlice = createSlice({
  name: "room",
  initialState: {
    data: [],
    list: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRoom.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getAllRoom.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.list = action.payload;
      })
      .addCase(getAllRoom.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(getOneRoom.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getOneRoom.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = action.payload;
      })
      .addCase(getOneRoom.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(createRoomSingle.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(createRoomSingle.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = action.payload;
      })
      .addCase(createRoomSingle.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      });
  },
});

export default roomSlice.reducer;
