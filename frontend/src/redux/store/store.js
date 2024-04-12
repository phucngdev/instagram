import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../useSlice/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
export default store;
