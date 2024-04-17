import { createSlice } from "@reduxjs/toolkit";
import {
  getDataUser,
  getInbox,
  sendInbox,
} from "../../services/user/account.service";
import { logout } from "../../services/user/auth.service";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    data: [],
    list: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataUser.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getDataUser.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = action.payload;
      })
      .addCase(getDataUser.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(getInbox.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getInbox.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.list = action.payload;
      })
      .addCase(getInbox.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
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

export default accountSlice.reducer;
