import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "../../services/user/auth.service";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = action.payload;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
