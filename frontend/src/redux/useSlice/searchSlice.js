import { createSlice } from "@reduxjs/toolkit";
import { getDataByQuery } from "../../services/user/search.service";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default searchSlice.reducer;
