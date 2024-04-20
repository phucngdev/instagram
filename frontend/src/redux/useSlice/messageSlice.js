import { createSlice } from "@reduxjs/toolkit";
import { sendInbox } from "../../services/user/message.service";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendInbox.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(sendInbox.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = action.payload;
      })
      .addCase(sendInbox.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      });
  },
});

export default messageSlice.reducer;
