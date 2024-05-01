import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const userDataFromCookie = Cookies.get("user");
const initialState = {
  data: userDataFromCookie ? JSON.parse(userDataFromCookie) : {},
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "userLogin",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.status = "Successfully!";
      state.data = action.payload;
    },
  },
});

export const { setUser } = postSlice.actions;
export default postSlice.reducer;
