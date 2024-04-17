import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../useSlice/authSlice";
import accountSlice from "../useSlice/accountSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    account: accountSlice,
  },
});
export default store;
