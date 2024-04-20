import { createSlice } from "@reduxjs/toolkit";
import { getDataUser } from "../../services/user/account.service";

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
      });
  },
});

export default accountSlice.reducer;
