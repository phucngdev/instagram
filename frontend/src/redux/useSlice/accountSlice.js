import { createSlice } from "@reduxjs/toolkit";
import {
  getDataByQuery,
  getDataUser,
  updateDataUser,
} from "../../services/user/account.service";

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
      .addCase(getDataByQuery.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getDataByQuery.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = action.payload;
      })
      .addCase(getDataByQuery.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(updateDataUser.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(updateDataUser.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = action.payload;
      })
      .addCase(updateDataUser.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      });
  },
});

export default accountSlice.reducer;
